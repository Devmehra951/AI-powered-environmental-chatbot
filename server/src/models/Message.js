import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    topic: { type: String, default: 'General', trim: true },
    userMessage: { type: String, required: true, trim: true },
    botResponse: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
