import express from 'express';
import { renderAddStudentForm , addStudent, getStudents } from './studentController.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/add', addStudent);
// Define the route for rendering the add student form
router.get('/add', renderAddStudentForm);

export default router;
