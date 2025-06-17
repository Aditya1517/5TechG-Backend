const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1].trim();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role || undefined // optional if using RBAC
    };

    if (process.env.NODE_ENV !== "production") {
      console.log("Authenticated user:", req.user);
    }

    next();
  } catch (err) {
    console.error("JWT Auth Error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }

    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = auth;
