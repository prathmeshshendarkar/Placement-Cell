import { getAllStudents, createStudent } from './studentRepository.js';
import Student from './studentSchema.js';

// Function to render list of students
export const renderStudentsList = async (req, res) => {
  try {
    const students = await Student.find();
    res.render('studentsList', { students });
  } catch (error) {
    res.render('error', { error });
  }
};

// Function to render the add student form
export const renderAddStudentForm = (req, res) => {
  res.render('add', { title: 'Add Student' });
};

export const getStudents = async (req, res) => {
  try {
    const students = await getAllStudents();
    res.render('list', { students });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Function to add a new student
export const addStudent = async (req, res) => {
  const { name, college, status, batch, dsaFinalScore, webDFinalScore, reactFinalScore } = req.body;

  try {
    const newStudent = await Student.create({
      name,
      college,
      status,
      batch,
      scores: {
        dsaFinalScore,
        webDFinalScore,
        reactFinalScore,
      },
      interviews: [],
      results: [],
    });
    await newStudent.save(); // Save the new student to the database
    
    res.redirect('/students');
  } catch (error) {
    res.render('error', { error });
  }
};
