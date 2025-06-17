const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware'); // JWT auth

/**
 * @route   PUT /api/profile/update
 * @desc    Update user profile
 * @access  Private
 */
router.put('/update', auth, updateProfile);

module.exports = router;
