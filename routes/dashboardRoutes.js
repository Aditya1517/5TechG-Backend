const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const auth = require('../middleware/authMiddleware'); // consistent naming

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard statistics
 * @access  Private
 */
router.get('/', auth, getDashboardStats);

module.exports = router;
