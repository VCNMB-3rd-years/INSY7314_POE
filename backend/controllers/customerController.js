// controllers/customerController.js
const Customer = require("../models/customerModel");

// POST: registerCustomer
exports.registerCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    const customer = await Customer.findOne({ username, password });
    if (!customer) return res.status(401).json({ error: "Invalid credentials" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
