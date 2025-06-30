import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Internship from './models/Internship.js';
import TestResult from './models/TestResult.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Question from './models/Question.js';

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

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Missing payment verification parameters' });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Here you would typically save the payment details to your database
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
    res.json({
      success: true,
      record: testResult
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
    
    res.json({
      success: true,
      attemptsUsed,
      totalAttempts,
      remainingAttempts
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 