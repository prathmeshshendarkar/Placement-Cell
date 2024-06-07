// csvRoutes.js

import express from 'express';
import { exportCSV } from './csvController.js';

const router = express.Router();

// Route to export CSV
router.get('/export', exportCSV);

export default router;
