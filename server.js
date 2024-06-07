import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import { connectUsingMongoose } from './config/mongoose.js';
import { configurePassport } from './config/passport.js';
import studentRoutes from './features/students/studentRoutes.js';
import interviewRoutes from './features/interviews/interviewRoutes.js';
import resultRoutes from './features/results/resultRoutes.js';
import userRoutes from './features/users/userRoutes.js';
import dotenv from 'dotenv';
import { handleError } from './errorHandler/applicationError.js';
import jobRoutes from './features/jobs/jobRoutes.js';
import csvRoutes from './features/csv/csvRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize express-flash
app.use(flash());

// Session middleware
app.use(
session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
})
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());


configurePassport();

// MongoDB connection
connectUsingMongoose();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files from the public directory
app.use(express.static('public'));

// Routes
app.use('/students', studentRoutes);
app.use('/interviews', interviewRoutes);
app.use('/results', resultRoutes);
app.use('/users', userRoutes);
app.use('/jobs', jobRoutes);
app.use('/csv', csvRoutes);

app.get('/', (req, res) => res.render('index', { body: "Some text" }));

// Error handling
app.use(handleError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
