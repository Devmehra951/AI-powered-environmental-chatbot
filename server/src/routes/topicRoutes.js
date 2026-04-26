import { Router } from 'express';
import {
  listTopics,
  createTopic,
  updateTopic,
  deleteTopic,
  topicValidation,
  topicIdValidation
} from '../controllers/topicController.js';
import { validate } from '../middleware/validate.js';
import { protectAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/topics', listTopics);
router.post('/topics', protectAdmin, topicValidation, validate, createTopic);
router.put('/topics/:id', protectAdmin, topicIdValidation, topicValidation, validate, updateTopic);
router.delete('/topics/:id', protectAdmin, topicIdValidation, validate, deleteTopic);

export default router;
