const dotenv = require("dotenv");
const app = require("./app");

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

// Unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("🛑 SIGINT received. Shutting down...");
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down...");
  server.close(() => process.exit(0));
});
