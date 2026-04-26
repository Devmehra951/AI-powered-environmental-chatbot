import { body, param } from 'express-validator';
import Topic from '../models/Topic.js';
import { sanitizeInput } from '../utils/sanitize.js';

export const topicValidation = [
  body('title').isLength({ min: 2, max: 120 }),
  body('category').isIn(['Climate', 'Wildlife', 'Pollution', 'Sustainability', 'General']),
  body('content').isLength({ min: 10, max: 3000 })
];

export const topicIdValidation = [param('id').isMongoId()];

export const listTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find().sort({ createdAt: -1 });
    res.json(topics);
  } catch (error) {
    next(error);
  }
};

export const createTopic = async (req, res, next) => {
  try {
    const payload = {
      title: sanitizeInput(req.body.title),
      category: sanitizeInput(req.body.category),
      content: sanitizeInput(req.body.content)
    };

    const topic = await Topic.create(payload);
    res.status(201).json(topic);
  } catch (error) {
    next(error);
  }
};

export const updateTopic = async (req, res, next) => {
  try {
    const updates = {
      title: sanitizeInput(req.body.title),
      category: sanitizeInput(req.body.category),
      content: sanitizeInput(req.body.content)
    };

    const topic = await Topic.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    return res.json(topic);
  } catch (error) {
    return next(error);
  }
};

export const deleteTopic = async (req, res, next) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    return res.json({ message: 'Topic deleted' });
  } catch (error) {
    return next(error);
  }
};
