import mongoose from 'mongoose';

const TestResultSchema = new mongoose.Schema({
  studentName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  score: { 
    type: Number, 
    required: true 
  },
  totalQuestions: { 
    type: Number, 
    required: true 
  },
  percentage: { 
    type: Number, 
    required: true 
  },
  attemptsUsed: { 
    type: Number, 
    default: 1 
  },
  totalAttempts: { 
    type: Number, 
    default: 3 
  },
  paymentId: { 
    type: String 
  },
  orderId: { 
    type: String 
  },
  testDate: { 
    type: Date, 
    default: Date.now 
  },
  timeTaken: { 
    type: String 
  },
  startedOn: { 
    type: Date 
  },
  completedOn: { 
    type: Date 
  },
  questions: [{
    question: String,
    selectedAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean
  }],
  domain: {
    type: String
  },
}, {
  timestamps: true
});

// Add indexes for better query performance
TestResultSchema.index({ email: 1 });
TestResultSchema.index({ testDate: -1 });
TestResultSchema.index({ paymentId: 1 });
TestResultSchema.index({ email: 1, testDate: -1 }); // For tracking attempts by email

export default mongoose.model('TestResult', TestResultSchema); 