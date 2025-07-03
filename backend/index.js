import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Internship from './models/Internship.js';
import TestResult from './models/TestResult.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Question from './models/Question.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'yourStrongPassword';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'supersecretkey';

// Brevo (Sendinblue) setup
const brevoClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = brevoClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
const brevoTransac = new SibApiV3Sdk.TransactionalEmailsApi();
const BREVO_SENDER = { email: process.env.BREVO_SENDER_EMAIL, name: process.env.BREVO_SENDER_NAME || 'Student Portal' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paymentLogsFile = path.join(__dirname, '../logs/payments.json');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Multer setup for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  }
});
const upload = multer({ storage });

// Serve avatars statically
app.use('/uploads/avatars', express.static('uploads/avatars'));

app.post('/api/internships', async (req, res) => {
  try {
    const data = req.body;
    const newInternship = new Internship(data);
    await newInternship.save();
    res.status(201).json({ success: true, message: 'Application saved!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving application', error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/api/internships', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching applications', error: err.message });
  }
});

// Helper function to get balanced questions
const getBalancedQuestions = async (category, count) => {
  const easyCount = Math.floor(count * 0.3);
  const mediumCount = Math.ceil(count * 0.4);
  const hardCount = Math.floor(count * 0.3);

  const easy = await Question.aggregate([
    { $match: { category: { $regex: `^${category}$`, $options: 'i' }, difficulty: 'easy' } },
    { $sample: { size: easyCount } }
  ]);
  const medium = await Question.aggregate([
    { $match: { category: { $regex: `^${category}$`, $options: 'i' }, difficulty: 'medium' } },
    { $sample: { size: mediumCount } }
  ]);
  const hard = await Question.aggregate([
    { $match: { category: { $regex: `^${category}$`, $options: 'i' }, difficulty: 'hard' } },
    { $sample: { size: hardCount } }
  ]);
  
  return [...easy, ...medium, ...hard];
};

// Get Test Questions
app.get('/api/test/questions', async (req, res) => {
  try {
    const { domain } = req.query;
    console.log('Requested domain:', domain);
    if (!domain) {
      return res.status(400).json({ success: false, error: 'Domain is required' });
    }

    const aptitudeQuestions = await getBalancedQuestions('aptitude', 10);
    const domainQuestions = await getBalancedQuestions(domain, 20);
    console.log('Aptitude questions found:', aptitudeQuestions.length);
    console.log('Domain questions found:', domainQuestions.length);

    let finalQuestions = [...aptitudeQuestions, ...domainQuestions];

    // Shuffle the array
    finalQuestions.sort(() => Math.random() - 0.5);
    
    // Omit correct answers before sending
    const questionsForStudent = finalQuestions.map(q => {
      const { correctAnswer, ...question } = q;
      return question;
    });

    res.json({ success: true, questions: questionsForStudent });

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch questions' });
  }
});

// Submit Test
app.post('/api/test/submit', async (req, res) => {
  try {
    const { studentName, email, domain, questions, timeTaken, startedOn, completedOn } = req.body;

    // Fetch correct answers from DB to ensure security
    const questionIds = questions.map(q => q._id);
    const correctQuestions = await Question.find({ '_id': { $in: questionIds } });

    const correctAnswersMap = correctQuestions.reduce((acc, q) => {
      acc[q._id.toString()] = q.correctAnswer;
      return acc;
    }, {});

    let score = 0;
    const detailedQuestions = questions.map(q => {
      const correctAnswer = correctAnswersMap[q._id];
      const isCorrect = q.selectedOption === correctAnswer;
      if (isCorrect) {
        score++;
      }
      return {
        question: q.question,
        options: q.options,
        selectedOption: q.selectedOption,
        selectedAnswer: q.selectedOption,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        category: q.category,
        difficulty: q.difficulty
      };
    });

    const newTestResult = new TestResult({
      studentName,
      email,
      domain,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      timeTaken,
      startedOn,
      completedOn,
      questions: detailedQuestions
    });

    const savedResult = await newTestResult.save();

    // Update user attempts
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name: studentName, email, attemptsUsed: 1, lastTestDate: new Date(), eligibilityStatus: 'Pending' });
    } else {
      user.attemptsUsed = (user.attemptsUsed || 0) + 1;
      user.lastTestDate = new Date();
      // If user has reached 5 attempts, reset hasPaid to false
      if (user.attemptsUsed >= 5) {
        user.hasPaid = false;
      }
    }
    await user.save();

    res.status(201).json({ success: true, resultId: savedResult._id, result: savedResult });

  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ success: false, error: 'Failed to submit test' });
  }
});

// Create Razorpay Order
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, customerInfo } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ valid: false, error: 'Invalid amount provided' });
    }

    const orderOptions = {
      amount: amount * 100, // Convert to paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(orderOptions);
    
    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order'
    });
  }
});

app.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing payment verification parameters' });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Update user payment status if email is provided
      if (email) {
        const user = await User.findOne({ email });
        if (user) {
          user.hasPaid = true;
          await user.save();
        }
      }
      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, error: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, error: 'Error verifying payment' });
  }
});

app.post('/api/test-results', async (req, res) => {
  try {
    const {
      studentName,
      email,
      score,
      totalQuestions,
      attemptsUsed,
      totalAttempts,
      paymentId,
      orderId,
      timeTaken,
      startedOn,
      completedOn,
      questions,
      domain
    } = req.body;

    if (!studentName || !email || score === undefined || !totalQuestions) {
      return res.status(400).json({
        success: false,
        error: 'Missing required test data'
      });
    }

    const percentage = Math.round((score / totalQuestions) * 100);
    
    const testData = {
      studentName,
      email,
      score,
      totalQuestions,
      percentage,
      attemptsUsed: attemptsUsed || 1,
      totalAttempts: totalAttempts || 3,
      paymentId,
      orderId,
      timeTaken,
      startedOn: startedOn ? new Date(startedOn) : new Date(),
      completedOn: completedOn ? new Date(completedOn) : new Date(),
      questions: questions || [],
      domain: domain || ''
    };

    const newTestResult = new TestResult(testData);
    const savedResult = await newTestResult.save();
    
    res.status(201).json({
      success: true,
      message: 'Test result saved successfully',
      record: savedResult
    });
  } catch (err) {
    console.error('Error saving test result:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving test result', 
      error: err.message 
    });
  }
});

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Create a JWT token
    const token = jwt.sign({ admin: true }, ADMIN_JWT_SECRET, { expiresIn: '2h' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Middleware to protect admin routes
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ success: false, message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
    if (decoded.admin) return next();
    return res.status(403).json({ success: false, message: 'Forbidden' });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

// Protect test results endpoint
const originalTestResultsHandler = app._router.stack.find(r => r.route && r.route.path === '/api/test-results' && r.route.methods.get);
if (originalTestResultsHandler) {
  const originalHandler = originalTestResultsHandler.route.stack[0].handle;
  app._router.stack = app._router.stack.filter(r => !(r.route && r.route.path === '/api/test-results' && r.route.methods.get));
  app.get('/api/test-results', requireAdminAuth, originalHandler);
}

app.get('/api/test-results', async (req, res) => {
  try {
    const testResults = await TestResult.find().sort({ testDate: -1 });
    res.json({
      success: true,
      records: testResults,
      total: testResults.length
    });
  } catch (err) {
    console.error('Error fetching test results:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching test results', 
      error: err.message 
    });
  }
});

app.get('/api/test-results/:id', async (req, res) => {
  try {
    const testResult = await TestResult.findById(req.params.id);
    if (!testResult) {
      return res.status(404).json({
        success: false,
        message: 'Test result not found'
      });
    }

    // Always set totalAttempts to 5
    testResult.totalAttempts = 5;

    // Fetch all original questions to get options
    const questionTexts = testResult.questions.map(q => q.question);
    const originalQuestions = await Question.find({ question: { $in: questionTexts } });
    const optionsMap = {};
    originalQuestions.forEach(q => {
      optionsMap[q.question] = q.options;
    });

    // Merge options into each result question
    const questionsWithOptions = testResult.questions.map(q => ({
      ...q._doc ? q._doc : q,
      options: optionsMap[q.question] ? Object.fromEntries(optionsMap[q.question]) : undefined
    }));

    // Return the modified result
    res.json({
      success: true,
      record: {
        ...testResult._doc ? testResult._doc : testResult,
        totalAttempts: 5,
        questions: questionsWithOptions
      }
    });
  } catch (err) {
    console.error('Error fetching test result:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching test result', 
      error: err.message 
    });
  }
});

// Get attempts by email
app.get('/api/attempts/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const totalAttempts = 5; // As per requirement
    
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const attemptsUsed = await TestResult.countDocuments({ email: email });
    const remainingAttempts = Math.max(0, totalAttempts - attemptsUsed);
    const user = await User.findOne({ email });
    const paymentStatus = user && user.hasPaid ? 'Paid' : 'Not Paid';
    
    res.json({
      success: true,
      attemptsUsed,
      totalAttempts,
      remainingAttempts,
      paymentStatus
    });
  } catch (err) {
    console.error('Error fetching attempts:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching attempts', 
      error: err.message 
    });
  }
});

// Get user profile by email
app.get('/api/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const { password, verificationCode, resetCode, resetCodeExpires, ...safeUser } = user.toObject();
    res.json({ success: true, user: { ...safeUser, paymentStatus: user.hasPaid ? 'Paid' : 'Not Paid' } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error checking user', error: err.message });
  }
});

// Create or update user profile
app.post('/api/user', upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, phone, education, experience, skills, message, domain } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    let user = await User.findOne({ email });
    let avatarUrl = user && user.avatarUrl;
    if (req.file) {
      avatarUrl = `/uploads/avatars/${req.file.filename}`;
    }
    if (user) {
      user.name = name;
      user.phone = phone;
      user.education = education;
      user.experience = experience;
      user.skills = skills;
      user.message = message;
      user.domain = domain;
      if (avatarUrl) user.avatarUrl = avatarUrl;
      user.updatedAt = new Date();
      await user.save();
    } else {
      user = new User({ name, email, phone, education, experience, skills, message, domain, avatarUrl });
      await user.save();
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving user', error: err.message });
  }
});

// Update eligibility status or attempts
app.patch('/api/user/:email', async (req, res) => {
  try {
    const { eligibilityStatus, attemptsUsed, lastTestDate } = req.body;
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (eligibilityStatus) user.eligibilityStatus = eligibilityStatus;
    if (typeof attemptsUsed === 'number') user.attemptsUsed = attemptsUsed;
    if (lastTestDate) user.lastTestDate = new Date(lastTestDate);
    user.updatedAt = new Date();
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating user', error: err.message });
  }
});

// Get all test results for a user
app.get('/api/user/:email/results', async (req, res) => {
  try {
    const results = await TestResult.find({ email: req.params.email }).sort({ testDate: -1 });
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching test results', error: err.message });
  }
});

// Helper: Generate 6-digit code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Auth: Sign Up (with 2FA email)
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, phone, education, experience, skills, domain } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate verification code
    const verificationCode = generateVerificationCode();
    // Save user with code and unverified status
    const user = new User({ name, email, password: hashedPassword, phone, education, experience, skills, domain, isVerified: false, verificationCode });
    await user.save();
    // Send code via email
    try {
      await brevoTransac.sendTransacEmail({
        sender: BREVO_SENDER,
        to: [{ email, name }],
        subject: 'Your Student Portal Verification Code',
        htmlContent: `<p>Hello ${name},</p><p>Your verification code is: <b>${verificationCode}</b></p><p>Enter this code to complete your registration.</p>`
      });
    } catch (emailErr) {
      console.error('Error sending verification email:', emailErr);
      return res.status(500).json({ success: false, message: 'Error sending verification email', error: emailErr.message });
    }
    res.json({ success: true, message: 'Verification code sent to your email', email });
  } catch (err) {
    console.error('Error in signup endpoint:', err);
    res.status(500).json({ success: false, message: 'Error signing up', error: err.message });
  }
});

// Verify code endpoint
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { email: verifyEmail, code } = req.body;
    if (!verifyEmail || !code) {
      return res.status(400).json({ success: false, message: 'Email and code are required' });
    }
    const user = await User.findOne({ email: verifyEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'User already verified' });
    }
    if (user.verificationCode !== code) {
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();
    res.json({ success: true, message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Verification failed', error: err.message });
  }
});

// Auth: Sign In
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
    res.json({ success: true, token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error signing in', error: err.message });
  }
});

// Resend verification code endpoint
app.post('/api/auth/resend', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'User already verified' });
    }
    // Generate new code and update user
    const newCode = generateVerificationCode();
    user.verificationCode = newCode;
    await user.save();
    // Send code via email
    try {
      await brevoTransac.sendTransacEmail({
        sender: BREVO_SENDER,
        to: [{ email, name: user.name }],
        subject: 'Your Student Portal Verification Code',
        htmlContent: `<p>Hello ${user.name},</p><p>Your new verification code is: <b>${newCode}</b></p><p>Enter this code to complete your registration.</p>`
      });
    } catch (emailErr) {
      console.error('Error sending verification email:', emailErr);
      return res.status(500).json({ success: false, message: 'Error sending verification email', error: emailErr.message });
    }
    res.json({ success: true, message: 'Verification code resent to your email' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error resending verification code', error: err.message });
  }
});

// Request password reset code
app.post('/api/auth/request-reset-code', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const resetCode = generateVerificationCode();
    user.resetCode = resetCode;
    user.resetCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    // Send code via email
    try {
      await brevoTransac.sendTransacEmail({
        sender: BREVO_SENDER,
        to: [{ email, name: user.name }],
        subject: 'Your Password Reset Code',
        htmlContent: `<p>Hello ${user.name},</p><p>Your password reset code is: <b>${resetCode}</b></p><p>This code is valid for 10 minutes.</p>`
      });
    } catch (emailErr) {
      return res.status(500).json({ success: false, message: 'Error sending reset code', error: emailErr.message });
    }
    res.json({ success: true, message: 'Reset code sent to your email' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error requesting reset code', error: err.message });
  }
});

// Verify reset code
app.post('/api/auth/verify-reset-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ success: false, message: 'Email and code are required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (!user.resetCode || !user.resetCodeExpires || user.resetCodeExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'Reset code expired or not found' });
    }
    if (user.resetCode !== code) {
      return res.status(400).json({ success: false, message: 'Invalid reset code' });
    }
    res.json({ success: true, message: 'Code verified' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error verifying code', error: err.message });
  }
});

// Update password after code verification
app.post('/api/auth/update-password', async (req, res) => {
  try {
    const { email, code, password } = req.body;
    if (!email || !code || !password) return res.status(400).json({ success: false, message: 'Email, code, and password are required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (!user.resetCode || !user.resetCodeExpires || user.resetCodeExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'Reset code expired or not found' });
    }
    if (user.resetCode !== code) {
      return res.status(400).json({ success: false, message: 'Invalid reset code' });
    }
    user.password = await bcrypt.hash(password, 10);
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating password', error: err.message });
  }
});

// Mark user as paid
app.post('/api/mark-paid', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.hasPaid = true;
    await user.save();
    res.json({ success: true, message: 'User marked as paid' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error marking user as paid', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 