// controllers/bankController.js
const Bank = require('../models/bankModel.js');

// GET: all banks
const getBanks = async (req, res) => {
  try {
    // create a new variable to hold the result of our query
    const banks = await Bank.find({});
    // return the banks
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {getBanks};