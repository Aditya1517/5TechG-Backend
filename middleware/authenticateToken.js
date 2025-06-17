const jwt = require("jsonwebtoken");

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const message =
        err.name === "TokenExpiredError"
          ? "Token expired"
          : "Invalid token";
      return res.status(403).json({ message });
    }

    req.user = user;

    if (process.env.NODE_ENV !== "production") {
      console.log("Authenticated user:", user);
    }

    next();
  });
};
