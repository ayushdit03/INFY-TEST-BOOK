import { Router } from 'express';
import Return from '../models/Return.js';
import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';

const router = Router();

// Return a book
router.post('/', async (req, res) => {
  try {
    const { username, bookid } = req.body;

    // Check if the book is borrowed
    const borrow = await Borrow.findOne({ username, bookid }); // Use Borrow.findOne correctly
    if (!borrow) {
      return res.status(400).send('Borrow record not found');
    }

    // Calculate fine if overdue
    const now = new Date();
    const fine = now > borrow.duedate 
      ? Math.ceil((now - borrow.duedate) / (1000 * 60 * 60 * 24)) * 10 
      : 0;

    // Create a return record
    const returnRecord = new Return({
      username,
      bookid,
      duedate: borrow.duedate,
      fine,
    });
    await returnRecord.save();

    // Mark the book as available
    const book = await Book.findById(bookid); // Use Book.findById correctly
    if (book) {
      book.available = true;
      await book.save();
    }

    // Remove the borrow record
    await Borrow.deleteOne({ _id: borrow._id }); // Correct way to remove the borrow record

    res.send(`Book returned successfully. Fine: ₹${fine}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
