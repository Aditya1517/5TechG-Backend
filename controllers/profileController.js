const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * Update user profile
 * Route: PUT /api/profile
 * Protected: true (requires auth middleware)
 */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // user ID from auth middleware
    const { name, username, password } = req.body;

    // Basic validation
    if (!name || !username) {
      return res.status(400).json({ status: 'error', message: 'Name and username are required.' });
    }

    const updateFields = { name, username };

    // Hash new password if provided
    if (password && password.trim() !== '') {
      if (password.length < 6) {
        return res.status(400).json({ status: 'error', message: 'Password must be at least 6 characters.' });
      }
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      select: '-password' // exclude password from response
    });

    if (!updatedUser) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully.',
      data: updatedUser
    });
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({ status: 'error', message: 'Server error while updating profile.' });
  }
};
