import { Router } from 'express';
import Book from '../models/Book.js'; // Only import the default export

const router = Router();

// Get all books
router.get('/find', async (req, res) => {
  try {
    const books = await Book.find(); // Use Book.find()
    res.json(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Add a new book
router.post('/add', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send('Book added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body); // Use Book.findByIdAndUpdate()
    res.send('Book updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
