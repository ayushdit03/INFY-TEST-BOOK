const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Use bcryptjs instead of bcrypt
const User = require('../models/User.js').default;

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, username, password, email, mobile, admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);  // bcryptjs hash function
    const user = new User({ name, username, password: hashedPassword, email, mobile, admin });
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
    if (!user) return res.status(404).send('User not found');

    const validPassword = await bcrypt.compare(password, user.password);  // bcryptjs compare function
    if (!validPassword) return res.status(403).send('Invalid password');

    const token = jwt.sign({ username, admin: user.admin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
