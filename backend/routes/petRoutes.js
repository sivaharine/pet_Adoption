const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');

// Get all pets with optional filters
router.get('/', async (req, res) => {
  try {
    const filters = {};
    
    if (req.query.type) filters.type = req.query.type;
    if (req.query.breed) filters.breed = new RegExp(req.query.breed, 'i');
    if (req.query.size) filters.size = req.query.size;
    if (req.query.gender) filters.gender = req.query.gender;
    if (req.query.status) filters.status = req.query.status;

    const pets = await Pet.find(filters).populate('addedBy', 'name email');
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pets' });
  }
});

// Get single pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('addedBy', 'name email');
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pet' });
  }
});

// Add new pet (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const pet = new Pet({
      ...req.body,
      addedBy: req.user.userId
    });

    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pet' });
  }
});

// Update pet (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.addedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this pet' });
    }

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pet' });
  }
});

// Delete pet (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.addedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this pet' });
    }

    await pet.remove();
    res.json({ message: 'Pet removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet' });
  }
});

module.exports = router; 