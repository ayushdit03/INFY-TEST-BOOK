import mongoose from 'mongoose';  
const { Schema, model } = mongoose;


const borrowSchema = new Schema({
    username: String,
    bookid: { type: Schema.Types.ObjectId, ref: 'Book' },
    borrowedAt: { type: Date, default: Date.now },
    duedate: { type: Date },
  });  

export default model('Borrow', borrowSchema);
