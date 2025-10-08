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

// GET: a single bank
const getBank = async (req, res) => {
  // get the id of the bank that the user is looking for, from the parameters
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to search for!" });
  }

  try {
    // try find the bank using the provided ID
    const bank = await Bank.findById(id);

    // if no bank is found matching the provided ID, we should return 404 with an informative message
    if (!bank) {
      res.status(404).json({ message: "No bank found that matches that ID." });
    }

    // otherwise, return the bank
    res.status(200).json(bank);
  } catch (error) {
    // throw a server error if an issue occurs
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

// PUT: update an existing bank
const updateBank = async (req, res) => {
  // first we get the ID from the url
  const id = req.params.id;
  // then the updated information from the body
  const {  bankName, swiftCode } = req.body;

  try {
    // firstly find the bank we need to update
    const bank = await Bank.findById(id);

    // if no bank, inform the user and don't proceed any further
    if (!bank) {
      res.status(404).json({ message: "No bank found that matches that ID." });
    }

    // otherwise, we then update the updated fields
    // finally, ensure that the new version (post update) is returned, rather than the old bank
    const updatedBank = await Bank.findByIdAndUpdate(
      id,
      {  bankName, swiftCode  },
      { new: true }
    );
    // spit it out encoded in json
    res.status(202).json(updatedBank);
  } catch (error) {
    // if things go south, spit out the error message
    res.status(500).json({ error: error.message });
  }
};

// DELETE: nuke a bank from existence
const deleteBank = async (req, res) => {
  // get the id of the bank we want to remove
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to delete." });
  }

  // first try find the bank
  try {
    var bank = await Bank.findById(id);

    // if no bank, 404 and exit the method
    if (!bank) {
      res.status(404).json({ message: "No bank found that matches that ID." });
    }

    // find the bank, delete it, and return what it was
    bank = await Bank.findByIdAndDelete(id);
    res.status(202).json(bank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBanks,
  getBank,
  createBank,
  updateBank,
  deleteBank,
};