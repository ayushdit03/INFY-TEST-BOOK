import { Router } from 'express';
import Book from '../models/Book.js'; 

const router = Router();

router.get('/find', async (req, res) => {
  try {
    const books = await Book.find(); 
    res.json(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/add', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send('Book added successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body); 
    res.send('Book updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
