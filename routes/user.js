import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

// Register a user
router.post('/register', async (req, res) => {
  try {
    const { name, username, password, email, mobile, admin } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ username }); // Correctly use User.findOne
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user
    const user = new User({
      name,
      username,
      password: hashedPassword,
      email,
      mobile,
      admin,
    });
    await user.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Authenticate user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username }); // Correctly use User.findOne
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // Check password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign({ id: user._id, admin: user.admin }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;