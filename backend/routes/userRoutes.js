const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser,
    getUserProfile, 
    updateUserProfile 
} = require('../controllers/userController'); 

const { protect } = require('../middleware/authMiddleware');

// Public/Auth Endpoints 
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected/User Endpoints
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;