const Customer = require("../models/customerModel.js");
const Employee = require("../models/employeeModel.js");

// POST: Register endpoint
const register = async (req, res) => {
  const { userType, username, password, ...rest } = req.body;

  try {
    let userModel = userType === "employee" ? Employee : Customer;

    const exists = await userModel.findOne({ username });
    if (exists) return res.status(400).json({ message: "Username already exists." });

    await userModel.create({ username, password, ...rest });
    res.status(200).json({ message: `${userType} registered successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Login endpoint
const login = async (req, res) => {
  const { userType, username, password } = req.body;

  try {
    let userModel = userType === "employee" ? Employee : Customer;
    const user = await userModel.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ message: `${userType} logged in successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET:Logout endpoint
const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
};

module.exports = { register, login, logout };
