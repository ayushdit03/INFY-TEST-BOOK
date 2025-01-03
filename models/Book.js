import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    name: String,
    author: String,
    genre: String,
    type: String,
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);



export default model('Book', bookSchema);
