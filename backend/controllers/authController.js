const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel.js");
const Employee = require("../models/employeeModel.js");
const { invalidateToken } = require("../middleware/authMiddleware.js");
require("dotenv").config();

// Helper: generate JWT with username and userType
const generateJwt = (username, userType) => {
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not found in .env");
    throw new Error("JWT_SECRET not defined");
  }
  return jwt.sign({ username, userType }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// POST: Register endpoint
const register = async (req, res) => {
  const { userType, username, accountNumber, password, lastName, firstName, nationalId } = req.body;

  console.log("Register request body:", req.body);

  try {
    const UserModel = userType === "employee" ? Employee : Customer;

    // Check if user exists
    const exists = await UserModel.findOne({ username });
    if (exists) return res.status(400).json({ message: "Username already exists." });

    // Validate password
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    // Create user; password will be hashed automatically by model's pre-save hook
    const user = await UserModel.create({  username, password, accountNumber, lastName, firstName, nationalId});

    // Generate JWT
    const token = generateJwt(username, userType);

    res.status(200).json({ message: `${userType} registered successfully`, token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST: Login endpoint
const login = async (req, res) => {
  const { userType, username, accountNumber, password } = req.body;

  console.log("Login request body:", req.body);

  try {
    const UserModel = userType === "employee" ? Employee : Customer;

    // Find user
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    // Compare password using model method
    const matching = await user.comparePassword(password);
    console.log("Password matches?", matching);

    if (!matching) return res.status(400).json({ message: "Invalid credentials." });

    // Generate JWT
    const token = generateJwt(username, userType);
    res.status(200).json({ message: `${userType} logged in successfully`, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST: Test password against hash (optional endpoint)
const testPassword = async (req, res) => {
  const { plainPassword, hashedPassword } = req.body;

  if (!plainPassword || !hashedPassword) {
    return res.status(400).json({ message: "Both plainPassword and hashedPassword are required." });
  }

  try {
    const match = await require("bcryptjs").compare(plainPassword, hashedPassword);
    res.status(200).json({ match });
  } catch (err) {
    console.error("Test password error:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET: Logout endpoint
const logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(400).json({ message: "No token provided." });

  invalidateToken(token);
  console.log("Token invalidated:", token);

  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout, testPassword };
