// controllers/customerController.js
const Customer = require("../models/customerModel");

// POST: registerCustomer
exports.registerCustomer = async (req, res) => {
  try {
    const { nationalId, firstName, lastName, username, password } = req.body;

    // Basic validation
    if (!nationalId || !firstName || !lastName || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if username or nationalId already exists
    const existing = await Customer.findOne({
      $or: [{ username }, { nationalId }],
    });
    if (existing) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create new customer
    const newCustomer = new Customer({
      nationalId,
      firstName,
      lastName,
      username,
      password, 
      accounts: [],
    });

    await newCustomer.save();

    res.status(201).json({
      message: "Customer registered successfully.",
      customer: {
        id: newCustomer._id,
        nationalId: newCustomer.nationalId,
        name: `${newCustomer.firstName} ${newCustomer.lastName}`,
        username: newCustomer.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// PUT: updateCustomer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST: login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const customer = await Customer.findOne({ username });

    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (plain text for now)
    if (customer.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      customer: {
        id: customer._id,
        username: customer.username,
        firstName: customer.firstName,
        lastName: customer.lastName,
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
