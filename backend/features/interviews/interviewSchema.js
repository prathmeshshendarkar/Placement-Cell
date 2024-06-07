// features/interviews/interviewSchema.js

import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  batch: {
    type: String,
    required: true,
  },
  results: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    result: {
      type: String,
      enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
    }
  }]
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
