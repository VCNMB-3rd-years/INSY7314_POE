// server/controllers/authController.js
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel.js");
const Employee = require("../models/employeeModel.js");
const Admin = require("../models/adminModel.js");
const { invalidateToken } = require("../middlewares/authMiddleware.js");
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET not set in .env");
  process.exit(1);
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Generate JWT containing role + ID
function generateJwt(user) {
  return jwt.sign(
    {
      id: String(user._id),
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// REGISTER (CUSTOMERS ONLY)
const register = async (req, res) => {
  try {
    const { username, password, firstName, lastName, nationalId, accountNumber } = req.body;

    // Admins & employees must NOT register here
    if (req.body.userType && req.body.userType !== "customer") {
      return res.status(403).json({ message: "Only customers may register themselves." });
    }

    // Required fields
    if (!username || !password || !firstName || !lastName || !nationalId || !accountNumber) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Account number check
    if (isNaN(accountNumber)) {
      return res.status(400).json({ message: "Account number must be numeric." });
    }

    const exists = await Customer.findOne({ username });
    if (exists) return res.status(409).json({ message: "Username already exists." });

    const user = await Customer.create({
      username,
      password,
      firstName,
      lastName,
      nationalId,
      accountNumber,
      role: "customer",
    });

    const token = generateJwt(user);
    return res.status(201).json({ message: "Customer registered.", token });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Registration failed", details: err.message });
  }
};

// LOGIN (CUSTOMERS, EMPLOYEES, ADMINS)
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Missing credentials." });

    // Try admin first
    let user =
      (await Admin.findOne({ username })) ||
      (await Employee.findOne({ username })) ||
      (await Customer.findOne({ username }));

    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials." });

    const token = generateJwt(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// TEST PASSWORD
const testPassword = async (req, res) => {
  const { plainPassword, hashedPassword } = req.body;
  if (!plainPassword || !hashedPassword)
    return res.status(400).json({ message: "Both fields required." });

  try {
    const match = await require("bcryptjs").compare(plainPassword, hashedPassword);
    return res.status(200).json({ match });
  } catch (err) {
    console.error("Test password error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// LOGOUT
const logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(400).json({ message: "No token provided." });

  invalidateToken(token);
  return res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout, testPassword };
