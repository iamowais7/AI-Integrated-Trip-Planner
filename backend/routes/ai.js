import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { generateTrip, supportChat } from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate', protect, generateTrip);
router.post('/support', supportChat);

export default router;
