const Vehicle = require('../models/Vehicle');
const Buyer = require('../models/Buyer');

/**
 * GET /api/dashboard
 * Returns key dashboard statistics: today's IN/OUT counts, total vehicles, and optional vehicle list.
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [todayIn, todayOut, totalVehicles, allVehicles] = await Promise.all([
      Vehicle.countDocuments({ inDate: { $gte: todayStart, $lte: todayEnd } }),
      Buyer.countDocuments({ outDate: { $gte: todayStart, $lte: todayEnd } }),
      Vehicle.estimatedDocumentCount(),
      Vehicle.find({}, { _id: 1, vehicleNumber: 1, inDate: 1 }) // optional: limit fields to reduce payload
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        todayIn,
        todayOut,
        totalVehicles,
        vehicles: allVehicles
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard statistics'
    });
  }
};
