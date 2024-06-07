// resultRoutes.js

import express from 'express';
const router = express.Router();

import { createResult , getAllResults} from './resultController.js';

router.post('/', createResult);
router.get('/', getAllResults);

export default router;
