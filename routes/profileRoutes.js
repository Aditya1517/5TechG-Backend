const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware'); // JWT auth

/**
 * @route   PUT /api/profile/update
 * @desc    Update user profile
 * @access  Private
 */
router.put('/update', authMiddleware, updateProfile);

module.exports = router;
