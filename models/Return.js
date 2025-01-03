import mongoose from 'mongoose'; 
const { Schema, model } = mongoose;


const returnSchema = new Schema(
  {
    username: String,
    bookid: { type: Schema.Types.ObjectId, ref: 'Book', unique: true },
    duedate: { type: Date, ref: 'Borrow' },
    fine: Number,
  },
  { timestamps: true }
);

export default model('Return', returnSchema);
