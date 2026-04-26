import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import env from '../config/env.js';
import User from '../models/User.js';

export const loginValidation = [body('email').isEmail(), body('password').isLength({ min: 8 })];

export const ensureDefaultAdmin = async () => {
  const existing = await User.findOne({ email: env.adminEmail.toLowerCase() });
  if (existing) return;

  const passwordHash = await bcrypt.hash(env.adminPassword, 10);
  await User.create({ email: env.adminEmail.toLowerCase(), passwordHash, role: 'admin' });
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn
    });

    return res.json({ token });
  } catch (error) {
    return next(error);
  }
};
