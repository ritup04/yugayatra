import mongoose from 'mongoose';

const InternshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  education: { type: String, required: true },
  experience: { type: String },
  skills: { type: String, required: true },
  message: { type: String },
  domain: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Internship', InternshipSchema); 