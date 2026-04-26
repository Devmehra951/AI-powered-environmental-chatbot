import { Router } from 'express';
import { loginAdmin, loginValidation } from '../controllers/adminController.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/admin/login', loginValidation, validate, loginAdmin);

export default router;
