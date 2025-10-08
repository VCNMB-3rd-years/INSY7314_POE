// controllers/bankController.js
const Bank = require('../models/bankModel.js');
const { create } = require('../models/customerModel.js');

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

// POST: create a bank
const createBank = async (req, res) => {
  // from the request sent by the browser/frontend application, look in the body for the required fields
  const { bankName, swiftCode} = req.body;

  // checked that all information is provided
  if (!bankName || !swiftCode) {
    res
      .status(400)
      .json({ message: "Please ensure that all fields are provided for the bank." });
  }

  try {
    // create a new bank instance using the information provided to us
    const bank = await Bank.create({ bankName, swiftCode});
    // and return code 201 (created), alongside the object we just added to the database
    res.status(201).json(bank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {getBanks, createBank};