import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  eligibilityStatus: { type: String, default: 'Not Eligible' }, // e.g., 'Eligible', 'Not Eligible', 'Pending'
  attemptsUsed: { type: Number, default: 0 },
  totalAttempts: { type: Number, default: 5 },
  lastTestDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
  phone: { type: String },
  education: { type: String },
  experience: { type: String },
  skills: { type: String },
  message: { type: String },
  domain: { type: String },
  avatarUrl: { type: String }, // URL or path to avatar image
  hasPaid: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  resetCode: { type: String },
  resetCodeExpires: { type: Date },
  // Payment tracking fields
  lastPaymentId: { type: String },
  lastOrderId: { type: String },
  lastPaymentDate: { type: Date },
});

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
export default User; 