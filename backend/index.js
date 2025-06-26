import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Internship from './models/Internship.js';

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 