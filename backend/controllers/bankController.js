// controllers/bankController.js
const Bank = require("../models/bankModel");

// GET: getBank
exports.getBank = async (req, res) => {
  try {
    const banks = await Bank.find();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
