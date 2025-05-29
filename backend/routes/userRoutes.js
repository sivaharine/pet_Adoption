const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Add pet to favorites
router.post('/favorites/:petId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const petId = req.params.petId;

    if (!user.favorites.includes(petId)) {
      user.favorites.push(petId);
      await user.save();
    }

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites' });
  }
});

// Remove pet from favorites
router.delete('/favorites/:petId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const petId = req.params.petId;

    user.favorites = user.favorites.filter(id => id.toString() !== petId);
    await user.save();

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites' });
  }
});

// Get user's favorites
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

module.exports = router; 