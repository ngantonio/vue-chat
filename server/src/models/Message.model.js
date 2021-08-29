import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({
  username: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },

},{timestamps: true })

const MessageSchema = mongoose.model('Message', MessageSchema);
export default MessageSchema;