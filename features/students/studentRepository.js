import Student from './studentSchema.js';

export const getAllStudents = async () => {
  return await Student.find();
};

export const createStudent = async (studentData) => {
  const student = new Student(studentData);
  return await student.save();
};
