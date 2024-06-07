import { findUserByUsername, findUserById } from './userRepository.js';
import User from './userSchema.js'; // Import the User model
import passport from 'passport';
import { createUser } from './userRepository.js';

// Render signup form
export const renderSignupForm = (req, res) => {
  res.render('signup'); // Render the signup.ejs page
};

// Handle user registration
export const registerUser = async (req, res) => {
  // Extract user data from the request body
  const { username, password, name, email } = req.body;

  try {
    // Create a new user record
    const newUser = await createUser({ username, password, name, email });
    res.redirect('/users/signin'); // Redirect to the signin page after registration
  } catch (error) {
    res.status(500).send(error.message); // Render an error page if there's an error
  }
};

// Render signin form
export const renderSigninForm = (req, res) => {
  res.render('signin'); // Render the signin.ejs page
};

// Handle user authentication
export const authenticateUser = passport.authenticate('local', {
  successRedirect: '/', // Redirect to the home page on successful authentication
  failureRedirect: '/users/signin', // Redirect back to the signin page on failed authentication
  failureFlash: true
});


export const getUserByUsername = async (username) => {
  return await findUserByUsername(username);
};

export const getUserById = async (id) => {
  return await findUserById(id);
};
