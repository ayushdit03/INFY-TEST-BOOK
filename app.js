import express from 'express';
import { connect } from 'mongoose';
import bookRoutes from './routes/book.js';
import borrowRoutes from './routes/borrow.js';
import returnRoutes from './routes/return.js';
import userRoutes from './routes/user.js';
import { json } from 'express';

const app = express();

// Middleware
app.use(json());

// Connect to MongoDB
connect('mongodb://localhost:27017/book', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes
app.use('/books', bookRoutes);
app.use('/borrow', borrowRoutes);
app.use('/return', returnRoutes);
app.use('/users', userRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
