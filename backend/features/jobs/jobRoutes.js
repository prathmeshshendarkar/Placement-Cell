// routes/jobRoutes.js

import express from 'express';
import { getJobListings } from './jobController.js';

const router = express.Router();

router.get('/', getJobListings);

export default router;
