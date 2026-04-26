import app from './app.js';
import env from './config/env.js';
import { connectDb } from './config/db.js';
import { ensureDefaultAdmin } from './controllers/adminController.js';

const start = async () => {
  try {
    await connectDb(env.mongodbUri);
    await ensureDefaultAdmin();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', error.message);
    process.exit(1);
  }
};

start();
