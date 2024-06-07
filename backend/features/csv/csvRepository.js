// csvRepository.js

import Student from '../students/studentSchema.js';
import Interview from '../interviews/interviewSchema.js';
import json2csv from 'json2csv';


export const generateCSV = async () => {
    try {
      // Retrieve necessary data from database
      const students = await Student.find().populate('interviews');
      console.log(students);
      // Format data into CSV format
      const csvData = formatData(students);
      
      return csvData;
    } catch (error) {
        // Retrieve necessary data from database
    //   const students = await Student.find().populate('interviews');
    //   console.log(students);
      throw new Error('Error generating CSV');
    }
  };

  const formatData = (students) => {
    // Define fields for CSV
    const fields = [
      '_id',
      'name',
      'college',
      'status',
      'scores.dsaFinalScore',
      'scores.webDFinalScore',
      'scores.reactFinalScore',
      'interviews.date',
      'interviews.company',
      'interviews.result'
    ];
  
    // Convert students data to CSV format
    try {
      const csv = json2csv.parse(students, { fields });
      return csv;
    } catch (error) {
      console.error('Error converting data to CSV:', error);
      return '';
    }
};
