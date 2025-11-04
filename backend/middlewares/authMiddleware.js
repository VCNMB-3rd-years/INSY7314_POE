// server/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenBlacklist = new Set();

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    if (tokenBlacklist.has(token)) return res.status(401).json({ message: "Token invalidated" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid or expired token" });

      req.user = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      };
      next();
    });
  } catch (err) {
    console.error("verifyToken error:", err);
    return res.status(500).json({ message: "Authentication error" });
  }
};

const authorizeRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};

const invalidateToken = (token) => {
  if (token) tokenBlacklist.add(token);
};

module.exports = { verifyToken, authorizeRole, invalidateToken };
