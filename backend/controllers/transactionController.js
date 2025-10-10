// controllers/transactionController.js
const Transaction = require("../models/transactionModel.js");

// GET: all transaction
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    // return the transactions
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: all transactions for a specific customer
const getTransaction = async (req, res) => {
  const customerId = req.params.customerId;

  if (!customerId) {
    return res.status(400).json({ message: "Customer ID is required." });
  }

  try {
    const transactions = await Transaction.find({ customerId });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found for this customer." });
    }

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST: create a transaction
const createTransaction = async (req, res) => {
  try {
    // Ensure the user is logged in and has an ID
    if (!req.user || !req.user.customerId) {
      return res.status(401).json({ message: "Unauthorized — please log in first." });
    }

    const { status, recipientReference, customerReference, amount, swiftCode } = req.body;
    const customerId = req.user.customerId; 

    // Validate required fields
    if (!recipientReference || !customerReference || !amount || !swiftCode) {
      return res.status(400).json({
        message: "Missing required fields: recipientReference, customerReference, swift code or amount."
      });
    }

    // Create the transaction
    const transaction = await Transaction.create({
      status,
      recipientReference,
      customerReference,
      amount,
      customerId,
      swiftCode
    });

    res.status(201).json({
      message: "Transaction created successfully.",
      transaction
    });
  } catch (error) {
    console.error("Create Transaction Error:", error);
    res.status(500).json({
      message: "An error occurred while creating the transaction.",
      error: error.message
    });
  }
};

// PUT: verify swift transaction code
const updateStatus = async (req, res) => {
  // first we get the ID from the url
  const id = req.params.id;
  // then the updated information from the body
  const { status, recipientReference, customerReference, amount, customerId, swiftCode} = req.body;

  try {
    // firstly find the transaction we need to update
    const transaction = await Transaction.findById(id);

    // if no transaction, inform the user and don't proceed any further
    if (!transaction) {
      res.status(404).json({ message: "No transaction found that matches that ID." });
    }

    // otherwise, we then update the updated fields
    // finally, ensure that the new version (post update) is returned, rather than the old transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { status, recipientReference, customerReference, amount, customerId, swiftCode},
      { new: true }
    );
    // spit it out encoded in json
    res.status(202).json(updatedTransaction);
  } catch (error) {
    // if things go south, spit out the error message
    res.status(500).json({ error: error.message });
  }
};

// DELETE: remove a transaction from existence
const deleteTransaction = async (req, res) => {
  // get the id of the transaction we want to remove
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to delete." });
  }

  // first try find the transaction
  try {
    var transaction = await Transaction.findById(id);

    // if no transaction, 404 and exit the method
    if (!transaction) {
      res.status(404).json({ message: "No transaction found that matches that ID." });
    }

    // find the transaction, delete it, and return what it was
    transaction = await Transaction.findByIdAndDelete(id);
    res.status(202).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTransactions, getTransaction, createTransaction, updateStatus, deleteTransaction};