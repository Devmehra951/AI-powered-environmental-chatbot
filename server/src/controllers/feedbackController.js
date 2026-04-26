import { body } from 'express-validator';
import Feedback from '../models/Feedback.js';
import Message from '../models/Message.js';

export const feedbackValidation = [
  body('messageId').isMongoId(),
  body('rating').isIn(['up', 'down'])
];

export const createFeedback = async (req, res, next) => {
  try {
    const { messageId, rating } = req.body;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const saved = await Feedback.create({ messageId, rating });
    return res.status(201).json(saved);
  } catch (error) {
    return next(error);
  }
};
