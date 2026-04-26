import dotenv from 'dotenv';

dotenv.config();

const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || '',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@prakriti.ai',
  adminPassword: process.env.ADMIN_PASSWORD || 'ChangeThisStrongPassword123!',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};

export default env;
