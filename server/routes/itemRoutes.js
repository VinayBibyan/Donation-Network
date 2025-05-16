
import express from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getUserItems,
  updateItemStatus
} from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Fix any potentially problematic route paths
router.get('/', getItems);
router.post('/', protect, upload.single('image'), createItem);
router.get('/user/items', protect, getUserItems);
router.put('/:id/status', protect, updateItemStatus);

router.get('/:id', getItemById);
router.put('/:id', protect, upload.single('image'), updateItem);
router.delete('/:id', protect, deleteItem);

export default router;
