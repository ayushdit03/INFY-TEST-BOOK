import { Router } from 'express';
import Return from '../models/Return.js';
import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { username, bookid } = req.body;

    const borrow = await Borrow.findOne({ username, bookid }); 
    if (!borrow) {
      return res.status(400).send('Borrow record not found');
    }

    const now = new Date();
    const fine = now > borrow.duedate 
      ? Math.ceil((now - borrow.duedate) / (1000 * 60 * 60 * 24)) * 10 
      : 0;

    const returnRecord = new Return({
      username,
      bookid,
      duedate: borrow.duedate,
      fine,
    });
    await returnRecord.save();

    const book = await Book.findById(bookid); 
    if (book) {
      book.available = true;
      await book.save();
    }

    await Borrow.deleteOne({ _id: borrow._id }); 

    res.send(`Book returned successfully. Fine: ₹${fine}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
