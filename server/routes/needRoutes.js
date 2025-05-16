
import express from 'express';
import {
  getNeeds,
  getNeedById,
  createNeed,
  updateNeed,
  deleteNeed,
  getUserNeeds,
  updateNeedStatus
} from '../controllers/needController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getNeeds)
  .post(protect, upload.single('image'), createNeed);

router.get('/user/needs', protect, getUserNeeds);
router.put('/:id/status', protect, updateNeedStatus);

router.route('/:id')
  .get(getNeedById)
  .put(protect, upload.single('image'), updateNeed)
  .delete(protect, deleteNeed);

export default router;
