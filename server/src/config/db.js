import mongoose from 'mongoose';

export const connectDb = async (mongodbUri) => {
  if (!mongodbUri) throw new Error('MONGODB_URI is required');
  await mongoose.connect(mongodbUri);
};
