const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Todo = require('../models/todo');
const { addtodo, gettodo } = require('../controllers/todocontroller');
const router = express.Router();
// Create a new todo (only if logged in)
router.post('/', protect,addtodo );

// Get todos for logged-in user
router.get('/', protect,gettodo );

module.exports = router;
