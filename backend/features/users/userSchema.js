// features/users/userSchema.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['employee', 'admin'], default: 'employee' } // Example role field
});

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to validate password
userSchema.methods.validPassword = function (password) {
  // Implement password validation logic, such as hashing and comparing
  return this.password === password; // Example, replace with actual hashing logic
};

const User = mongoose.model('User', userSchema);

export default User;
