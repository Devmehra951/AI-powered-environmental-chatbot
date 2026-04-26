import { body, query } from 'express-validator';
import Message from '../models/Message.js';
import { getBotReply } from '../services/openaiService.js';
import { sanitizeInput } from '../utils/sanitize.js';

export const chatValidation = [body('message').isLength({ min: 2, max: 1000 }), body('topic').optional().isString()];

export const historyValidation = [query('limit').optional().isInt({ min: 1, max: 100 })];

export const createChat = async (req, res, next) => {
  try {
    const message = sanitizeInput(req.body.message);
    const topic = sanitizeInput(req.body.topic || 'General');

    const botResponse = await getBotReply({ message, topic });

    const saved = await Message.create({ topic, userMessage: message, botResponse });

    res.status(201).json({
      messageId: saved._id,
      topic: saved.topic,
      userMessage: saved.userMessage,
      botResponse: saved.botResponse,
      createdAt: saved.createdAt
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const topic = req.query.topic ? sanitizeInput(req.query.topic) : null;
    const limit = Number(req.query.limit || 30);
    const filter = topic ? { topic } : {};

    const history = await Message.find(filter).sort({ createdAt: -1 }).limit(limit);
    res.json(history);
  } catch (error) {
    next(error);
  }
};
