import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getMyTrips,
  getTripById,
  getSharedTrip,
  updateTrip,
  deleteTrip,
  shareTrip,
} from '../controllers/tripController.js';

const router = express.Router();

router.get('/share/:shareId', getSharedTrip);          // public
router.get('/', protect, getMyTrips);
router.get('/:id', protect, getTripById);
router.put('/:id', protect, updateTrip);
router.delete('/:id', protect, deleteTrip);
router.post('/:id/share', protect, shareTrip);

export default router;
