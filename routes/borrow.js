import { Router } from 'express';
import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';

const router = Router();

// Borrow a book
router.post('/', async (req, res) => {
  try {
    const { username, bookid } = req.body;

    // Check if the book is available
    const book = await Book.findById(bookid); // Use Book.findById() correctly
    if (!book || !book.available) {
      return res.status(400).send('Book not available');
    }

    // Create a borrow record
    const borrow = new Borrow({ username, bookid, borrowedAt: new Date() });
    await borrow.save();

    // Mark the book as unavailable
    book.available = false;
    await book.save();

    res.status(201).send('Book borrowed successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
