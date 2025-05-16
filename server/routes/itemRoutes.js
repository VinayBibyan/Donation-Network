
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

router.route('/')
  .get(getItems)
  .post(protect, upload.single('image'), createItem);

router.get('/user/items', protect, getUserItems);
router.put('/:id/status', protect, updateItemStatus);

router.route('/:id')
  .get(getItemById)
  .put(protect, upload.single('image'), updateItem)
  .delete(protect, deleteItem);

export default router;
