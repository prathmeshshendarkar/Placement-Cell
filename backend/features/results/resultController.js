// resultController.js

import * as resultRepository from './resultRepository.js';

// Function to create a new result
export const createResult = async (req, res) => {
  // Extract result data from the request body
  const { interviewId, studentId, result } = req.body;

  try {
    // Create a new result record using repository function
    const newResult = await resultRepository.createResult({ interviewId, studentId, result });
    res.status(201).json({ success: true, data: newResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Function to get all results
export const getAllResults = async (req, res) => {
  try {
    // Retrieve all results using repository function
    const results = await resultRepository.getAllResults();
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
