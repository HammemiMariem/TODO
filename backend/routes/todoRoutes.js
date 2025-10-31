const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Todo = require('../models/todo');
const { addtodo, gettodo,updatetodo,
  deletetodo } = require('../controllers/todocontroller');
const router = express.Router();
// Create a new todo (only if logged in)
router.post('/', protect,addtodo );

// Get todos for logged-in user
router.get('/', protect,gettodo );
// Update a todo by ID (only if logged in)
router.put('/:id', protect,updatetodo );
// Delete a todo by ID (only if logged in)
router.delete('/:id', protect,deletetodo );
module.exports = router;
