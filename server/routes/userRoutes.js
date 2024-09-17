const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', getUserProfile);

// Update user profile
router.put('/profile', updateUserProfile);

module.exports = router;
