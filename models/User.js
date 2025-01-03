import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: String,
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    mobile: { type: Number, unique: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model('User', userSchema);
