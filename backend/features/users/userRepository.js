import User from './userSchema.js';

export const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (userData) => {
  return await User.create(userData);
};

