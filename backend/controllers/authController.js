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

function generateJwt(user) {
  const payload = {
    id: String(user._id),
    username: user.username,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// --------------------------------------------------
// REGISTER (customers only)
// --------------------------------------------------
const register = async (req, res) => {
  try {
    const { userType, username, accountNumber, password, lastName, firstName, nationalId } = req.body;

    // Only customers can self-register
    if (userType !== "customer") {
      return res.status(403).json({ message: "Registration is only allowed for customers." });
    }

    if (!username || !password || !firstName || !lastName || !nationalId || !accountNumber) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Basic checks - validators/more strict checks done by validateRequest
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters." });
    if (isNaN(accountNumber)) return res.status(400).json({ message: "Account number must be numeric." });

    const existing = await Customer.findOne({ username });
    if (existing) return res.status(409).json({ message: "Username already exists." });

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

// --------------------------------------------------
// LOGIN (customers, employees, admins)
// - requires valid CSRF token (app.js enforces csurf)
// --------------------------------------------------
const login = async (req, res) => {
  try {
    const { userType, username, password } = req.body;
    if (!userType || !username || !password) return res.status(400).json({ message: "Missing credentials." });

    let UserModel;
    if (userType === "customer") UserModel = Customer;
    else if (userType === "employee") UserModel = Employee;
    else if (userType === "admin") UserModel = Admin;
    else return res.status(400).json({ message: "Invalid userType." });

    const user = await UserModel.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials." });

    // Generate JWT with role embedded
    const token = generateJwt(user);

    return res.status(200).json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// --------------------------------------------------
// TEST password - optional helper
// --------------------------------------------------
const testPassword = async (req, res) => {
  const { plainPassword, hashedPassword } = req.body;
  if (!plainPassword || !hashedPassword) return res.status(400).json({ message: "Both fields required." });
  try {
    const match = await require("bcryptjs").compare(plainPassword, hashedPassword);
    return res.status(200).json({ match });
  } catch (err) {
    console.error("Test password error:", err);
    return res.status(500).json({ error: err.message });
  }
};

// --------------------------------------------------
// LOGOUT
// - invalidates token (in-memory). For production, replace with Redis set/expire.
// --------------------------------------------------
const logout = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ message: "No token provided." });

  invalidateToken(token); // adds to blacklist
  return res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout, testPassword };
