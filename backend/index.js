import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Internship from './models/Internship.js';
import TestResult from './models/TestResult.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

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
    const attempts = await TestResult.countDocuments({ email: email });
    const remainingAttempts = Math.max(0, 5 - attempts); // 5 total attempts
    
    res.json({
      success: true,
      attemptsUsed: attempts,
      totalAttempts: 5,
      remainingAttempts: remainingAttempts
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