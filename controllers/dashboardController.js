const Vehicle = require('../models/Vehicle');
const Buyer = require('../models/Buyer');

exports.getDashboardStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const start = startDate ? new Date(startDate) : todayStart;
    const end = endDate ? new Date(endDate) : todayEnd;

    const [todayIn, todayOut, totalVehicles, allVehicles] = await Promise.all([
      Vehicle.countDocuments({ inDate: { $gte: start, $lte: end } }),
      Buyer.countDocuments({ outDate: { $gte: start, $lte: end } }),
      Vehicle.estimatedDocumentCount(),
      Vehicle.find({}, { _id: 1, vehicleNumber: 1, inDate: 1 }).lean()
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        dateRange: { start, end },
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
