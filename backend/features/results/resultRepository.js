// resultRepository.js

import Result from './resultSchema.js';

// Function to create a new result
export const createResult = async ({ interviewId, studentId, result }) => {
  return await Result.create({ interview: interviewId, student: studentId, result });
};

// Function to get all results
export const getAllResults = async () => {
  return await Result.find();
};

// Implement other CRUD operations as needed
