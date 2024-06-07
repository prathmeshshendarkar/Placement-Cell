// interviewRepository.js

import Interview from './interviewSchema.js';

export const createInterview = async (interviewData) => {
  return await Interview.create(interviewData);
};

export const getAllInterviews = async () => {
  return await Interview.find().populate('student');
};

// Function to assign a student to an interview in the database
export const assignStudentToInterviewInDatabase = async (interviewId, studentId) => {
    try {
        // Find the interview by ID
        const interview = await Interview.findById(interviewId);
        if (!interview) {
            throw new Error('Interview not found');
        }

        // Update the interview document with the student ID
        interview.student = studentId;

        // Save the changes to the interview document
        await interview.save();

        return interview; // Return the updated interview document
    } catch (error) {
        throw new Error(error.message);
    }
};
