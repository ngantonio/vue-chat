import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, trim: true },
},{timestamps: true })

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;