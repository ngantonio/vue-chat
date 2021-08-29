import mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({
  username: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
},{timestamps: true })

const MessageModel = mongoose.model('Message', MessageSchema);
export default MessageModel;