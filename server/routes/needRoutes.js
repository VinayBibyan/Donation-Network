
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

router.get('/', getNeeds);
router.post('/', protect, upload.single('image'), createNeed);

router.get('/user/needs', protect, getUserNeeds);
router.put('/:id/status', protect, updateNeedStatus);

router.get('/:id', getNeedById);
router.put('/:id', protect, upload.single('image'), updateNeed);
router.delete('/:id', protect, deleteNeed);
export default router;
