import { Router } from 'express';
import bcrypt from 'bcryptjs';  // Use bcryptjs only

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, username, password, email, mobile, admin } = req.body;

    const existingUser = await User.findOne({ username }); 
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Use bcryptjs for hashing

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

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }); 
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password); // Use bcryptjs for comparison
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, admin: user.admin }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
