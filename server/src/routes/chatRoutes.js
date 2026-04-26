import { Router } from 'express';
import { createChat, chatValidation, getHistory, historyValidation } from '../controllers/chatController.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/chat', chatValidation, validate, createChat);
router.get('/history', historyValidation, validate, getHistory);

export default router;
