// server/controllers/authController.js
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel.js");
const Employee = require("../models/employeeModel.js");
const { invalidateToken } = require("../middlewares/authMiddleware.js");
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET not set in .env");
  process.exit(1);
}

const generateJwt = (user) => {
  const payload = {
    id: String(user._id),
    username: user.username,
    role: user.role || user.userType || user.userType, 
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });
};

const register = async (req, res) => {
  const { userType, username, accountNumber, password, lastName, firstName, nationalId } = req.body;
  try {
    if (!userType || !username || !accountNumber || !password || !lastName || !firstName || !nationalId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const UserModel = userType === "customer" ? Customer : Employee;

    const exists = await UserModel.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: `The username '${username}' is already taken.` });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    if (isNaN(accountNumber)) {
      return res.status(400).json({ message: "Account number must be numeric." });
    }

    const user = await UserModel.create({
      userType,
      role: userType,
      username,
      password,
      accountNumber,
      lastName,
      firstName,
      nationalId,
    });

    const token = generateJwt(user);

    res.status(201).json({
      message: `${userType} : '${username}' registered successfully.`,
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed", details: err.message });
  }
};

const login = async (req, res) => {
  const { userType, username, password } = req.body;
  try {
    if (!userType || !username || !password) return res.status(400).json({ message: "Missing credentials." });

    const UserModel = userType === "customer" ? Customer : Employee;
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const matching = await user.comparePassword(password);
    if (!matching) return res.status(400).json({ message: "Invalid credentials." });

    if (!user.role) user.role = userType;

    const token = generateJwt(user);
    res.status(200).json({ message: `${user.role} logged in successfully`, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

const testPassword = async (req, res) => {
  const { plainPassword, hashedPassword } = req.body;
  if (!plainPassword || !hashedPassword) return res.status(400).json({ message: "Both fields required." });
  try {
    const match = await require("bcryptjs").compare(plainPassword, hashedPassword);
    res.status(200).json({ match });
  } catch (err) {
    console.error("Test password error:", err);
    res.status(500).json({ error: err.message });
  }
};

const logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ message: "No token provided." });
  invalidateToken(token);
  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout, testPassword };
