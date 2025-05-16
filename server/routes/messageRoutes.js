
import express from 'express';
import {
  getConversations,
  getMessages,
  sendMessage
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All message routes require authentication

router.get('/conversations', getConversations);
router.route('/:userId')
  .get(getMessages)
  .post(sendMessage);

export default router;
