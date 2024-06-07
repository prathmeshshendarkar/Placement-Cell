// features/students/studentSchema.js

import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['placed', 'not_placed'],
    default: 'not_placed',
  },
  scores: {
    dsaFinalScore: Number,
    webDFinalScore: Number,
    reactFinalScore: Number,
  },
  results: [{
    company: String,
    result: {
      type: String,
      enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
    }
  }],
  interviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interview' }],
  
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
