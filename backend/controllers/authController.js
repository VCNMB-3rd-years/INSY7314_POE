const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel.js");
const Employee = require("../models/employeeModel.js");
const { invalidateToken } = require("../middleware/authMiddleware.js");
require("dotenv").config();

// Helper: generate JWT
const generateJwt = (username, userType) => {
  return jwt.sign({ username, userType }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// POST: Register endpoint
const register = async (req, res) => {
  const { userType, username, password, ...rest } = req.body;

  try {
    const userModel = userType === "employee" ? Employee : Customer;

    const exists = await userModel.findOne({ username });
    if (exists) return res.status(400).json({ message: "Username already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ username, password: hashedPassword, ...rest });

    res.status(200).json({ token: generateJwt(username, userType) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Login endpoint
const login = async (req, res) => {
  const { userType, username, password } = req.body;

  try {
    const userModel = userType === "employee" ? Employee : Customer;
    const user = await userModel.findOne({ username });

    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const matching = await bcrypt.compare(password, user.password);
    if (!matching) return res.status(400).json({ message: "Invalid credentials." });

    res.status(200).json({ token: generateJwt(username, userType) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Logout endpoint
const logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(400).json({ message: "No token provided." });

  invalidateToken(token);
  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout };
