import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateTrip } from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate', protect, generateTrip);

export default router;
