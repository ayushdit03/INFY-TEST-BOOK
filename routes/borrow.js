import { Router } from 'express';
import Borrow from '../models/Borrow.js';
import Book from '../models/Book.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { username, bookid } = req.body;

    const book = await Book.findById(bookid); 
    if (!book || !book.available) {
      return res.status(400).send('Book not available');
    }

    const borrow = new Borrow({ username, bookid, borrowedAt: new Date() });
    await borrow.save();

    book.available = false;
    await book.save();

    res.status(201).send('Book borrowed successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
