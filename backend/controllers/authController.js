const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get user profile
exports.getUserProfile = async (req, res) => {
    const user = req.user;
    if (user) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        address: user.address || '',
        picture: user.picture || '',
      });  
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }; 
//update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = req.user;  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.address = req.body.address !== undefined ? req.body.address : user.address;
    user.picture = req.body.picture !== undefined ? req.body.picture : user.picture;
    
    if (req.body.password) {
      user.password = req.body.password;
    }
    
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      address: updatedUser.address || '',
      picture: updatedUser.picture || '',
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};