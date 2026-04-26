import { Router } from 'express';
import { createFeedback, feedbackValidation } from '../controllers/feedbackController.js';
import { validate } from '../middleware/validate.js';

const router = Router();
router.post('/feedback', feedbackValidation, validate, createFeedback);

export default router;
