const Todo = require('../models/todo');
const addtodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title !== undefined ? req.body.title : '',
      description: req.body.description !== undefined ? req.body.description : '',
      priority: req.body.priority !== undefined && req.body.priority !== '' ? req.body.priority : 'medium',
      deadline: req.body.deadline && req.body.deadline !== '' ? req.body.deadline : undefined,
      progress: req.body.progress !== undefined && req.body.progress !== '' ? req.body.progress : 'not started',
      completed: req.body.completed !== undefined ? req.body.completed : false,
      user: req.user._id, // link todo to logged-in user
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const gettodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update user
const updatetodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }
    // Update fields
    todo.title = req.body.title !== undefined ? req.body.title : todo.title;
    todo.description = req.body.description !== undefined ? req.body.description : todo.description;
    todo.priority = req.body.priority !== undefined ? req.body.priority : todo.priority;
    todo.deadline = req.body.deadline !== undefined ? req.body.deadline : todo.deadline;
    
    // Handle progress and completed synchronization
    // Priority: progress takes precedence when both are provided
    if (req.body.progress !== undefined) {
      todo.progress = req.body.progress;
      // Sync completed based on progress (progress is source of truth)
      todo.completed = req.body.progress === 'completed';
    } else if (req.body.completed !== undefined) {
      // Only completed is provided, sync progress accordingly
      todo.completed = req.body.completed;
      if (req.body.completed) {
        // If marking as completed, set progress to 'completed'
        todo.progress = 'completed';
      } else {
        // If unmarking as completed, set to 'not started' only if currently 'completed'
        if (todo.progress === 'completed') {
          todo.progress = 'not started';
        }
        // Otherwise keep current progress state (in progress stays in progress)
      }
    }

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete user
const deletetodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or not authorized" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { addtodo, gettodo, updatetodo, deletetodo };