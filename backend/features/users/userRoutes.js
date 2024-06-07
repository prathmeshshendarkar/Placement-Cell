import express from 'express';
import { renderSignupForm, registerUser, renderSigninForm, authenticateUser } from './userController.js';
const router = express.Router();

// Render signup form
router.get('/signup', renderSignupForm);

// Handle user registration
router.post('/signup', registerUser);

// Render signin form
router.get('/signin', renderSigninForm);

// Handle user authentication
router.post('/signin', authenticateUser);

export default router;
