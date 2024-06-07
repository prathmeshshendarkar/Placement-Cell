// csvController.js

import { generateCSV } from './csvRepository.js';

export const exportCSV = async (req, res) => {
  try {
    // Retrieve data from repository
    const data = await generateCSV();
    console.log(data);
    // Send CSV file as response
    res.attachment('student_data.csv');
    res.send(data);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).send('Internal Server Error');
  }
};
