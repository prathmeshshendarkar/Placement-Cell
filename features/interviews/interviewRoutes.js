// features/interviews/interviewRoutes.js

import express from 'express';
import { renderNewInterviewForm, createInterview, renderInterviewsList, assignStudentToInterview, getInterviewStudents, updateStudentResultStatus } from './interviewController.js';

const router = express.Router();

// Render form for creating a new interview
router.get('/new', renderNewInterviewForm);

// Create a new interview
router.post('/', createInterview);

// Render list of interviews
router.get('/', renderInterviewsList);

// Route to assign a student to an interview
router.post('/assign', assignStudentToInterview);

// Route to view all students for a particular interview
router.get('/:interviewId/students', getInterviewStudents);

// Route to update result status for a student
router.post('/:interviewId/students/:studentId/update-result', updateStudentResultStatus);

export default router;
