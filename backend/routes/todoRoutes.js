const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Todo = require('../models/todo');

const router = express.Router();

// Create a new todo (only if logged in)
router.post('/', protect, async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user._id, // link todo to logged-in user
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get todos for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
