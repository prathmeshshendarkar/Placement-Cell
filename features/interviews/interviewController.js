// features/interviews/interviewController.js

import Interview from './interviewSchema.js'; // Adjust import based on your folder structure
import Student from '../students/studentSchema.js'; // Adjust import based on your folder structure
import mongoose from 'mongoose';

// Function to get all students for a particular interview
export const getInterviewStudents = async (req, res) => {
  const { interviewId } = req.params;

  try {
      // Find the interview by ID and populate the students
      const interview = await Interview.findById(interviewId).populate('students');
      if (!interview) {
          return res.status(404).json({ success: false, message: 'Interview not found' });
      }

      // Map over students and add their result for the current interview
      const studentsWithResults = await Promise.all(interview.students.map(async student => {
          const studentWithResult = await Student.findById(student._id);
          const result = interview.results.find(r => r.student.toString() === student._id.toString());
          return {
              ...studentWithResult.toObject(),
              result: result ? result.result : 'Not Available'
          };
      }));

      // Render the interviewStudents view and pass the interview and studentsWithResults data
      res.render('interviewStudents', { interview: { ...interview.toObject(), students: studentsWithResults } });
  } catch (error) {
      res.render('error', { error });
  }
};

// Function to update result status for a student
export const updateStudentResultStatus = async (req, res) => {
  const { interviewId, studentId } = req.params;
  const { result } = req.body;

  try {
      // Find the interview by ID
      const interview = await Interview.findById(interviewId);
      if (!interview) {
          return res.status(404).json({ success: false, message: 'Interview not found' });
      }

      // Update the result in the interview's results array
      const studentResult = interview.results.find(res => res.student.toString() === studentId);
      if (studentResult) {
          studentResult.result = result;
      } else {
          interview.results.push({ student: studentId, result });
      }

      await interview.save();

      // If the result is PASS, update the student's status to placed
      if (result === 'PASS') {
          await Student.findByIdAndUpdate(studentId, { status: 'placed' });
      } else {
          // If the result is not PASS, update the student's status to not_placed
          await Student.findByIdAndUpdate(studentId, { status: 'not_placed' });
      }

      res.redirect(`/interviews/${interviewId}/students`);
  } catch (error) {
      res.render('error', { error });
  }
};

// Function to get all interviews
export const getAllInterviews = async (req, res) => {
  try {
      const interviews = await Interview.find().populate('students');
      res.render('interviewsList', { interviews });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};

// Function to render a form for creating a new interview
export const renderNewInterviewForm = (req, res) => {
  res.render('newInterview');
};

// Function to create a new interview
export const createInterview = async (req, res) => {
    const { company, date, studentName, batch } = req.body;
    console.log(studentName);
    try {
      // Find the student by name to get their ObjectId
      const student = await Student.findOne({ name: studentName });
      if (!student) {
        throw new Error('Student not found');
      }
  
      // Create the interview with the student's ObjectId
      const newInterview = await Interview.create({ company, date, student: student._id, batch });
      res.redirect('/interviews'); // Redirect to the list of interviews after creation
    } catch (error) {
      res.render('error', { error }); // Render an error page if there's an error
    }
  };

// Function to get all interviews and render the list view
export const renderInterviewsList = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.render('interviewsList', { interviews: interviews }); // Render the list view with interviews data
  } catch (error) {
    res.render('error', { error }); // Render an error page if there's an error
  }
};

// Function to assign a student to an interview
export const assignStudentToInterview = async (req, res) => {
  const { interviewId, studentName } = req.body;

  try {
      // Find the student by name to get their ObjectId
      const student = await Student.findOne({ name: studentName });
      if (!student) {
          throw new Error('Student not found');
      }

      // Find the interview and update the students array
      const interview = await Interview.findByIdAndUpdate(
          interviewId,
          { $addToSet: { students: student._id } },
          { new: true }
      );

      if (!interview) {
          throw new Error('Interview not found');
      }

      res.redirect(`/interviews/${interviewId}/students`);
  } catch (error) {
      res.render('error', { error }); // Render an error page if there's an error
  }
};