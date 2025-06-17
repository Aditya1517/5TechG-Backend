const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, username, password } = req.body;

    if (!name || !username) {
      return res.status(400).json({ status: 'error', message: 'Name and username are required.' });
    }

    // Trim fields
    const updateFields = {
      name: name.trim(),
      username: username.trim()
    };

    // Ensure unique username
    const existingUser = await User.findOne({ username: updateFields.username });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ status: 'error', message: 'Username already taken.' });
    }

    // Handle password update
    if (password && password.trim() !== '') {
      if (password.length < 6) {
        return res.status(400).json({ status: 'error', message: 'Password must be at least 6 characters.' });
      }
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    // Update profile
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true
    }).select('-password');

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
