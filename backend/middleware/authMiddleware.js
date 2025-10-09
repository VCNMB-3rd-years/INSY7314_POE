const jwt = require("jsonwebtoken");
require("dotenv").config();

// Token blacklist to support logout
const tokenBlacklist = new Set();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });
  if (tokenBlacklist.has(token)) return res.status(401).json({ message: "Token invalidated" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Invalidate a token
const invalidateToken = (token) => {
  tokenBlacklist.add(token);
};

module.exports = { verifyToken, invalidateToken };