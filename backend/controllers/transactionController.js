const Transaction = require("../models/transactionModel.js");

// GET all transactions
const getTransactions = async (req, res) => {
  try {
    let transactions;
    if (req.user.userType === 'employee') {
      // employees see all transactions
      transactions = await Transaction.find({});
    } else {
      // customers see only their transactions
      transactions = await Transaction.find({ customerId: req.user.customerId });
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a transaction by ID
// GET: all transactions for a specific customer
const getTransaction = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Transaction ID is required." });
  const customerId = req.params.customerId;

  if (!customerId) {
    return res.status(400).json({ message: "Customer ID is required." });
  }

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found." });

    // Customers can only access their own transactions
    if (req.user.userType === 'customer' && transaction.customerId !== req.user.customerId) {
      return res.status(403).json({ message: "Forbidden: not your transaction." });
    const transactions = await Transaction.find({ customerId });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found for this customer." });
    }

    res.status(200).json(transaction);
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// POST create transaction
const createTransaction = async (req, res) => {
  const { status } = req.body;
  const customerId = req.user.customerId;

  if (!status) {
    return res.status(400).json({ message: "Transaction status is required." });
  }

  try {
    const transaction = await Transaction.create({ status, customerId });
    res.status(201).json(transaction);
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

// PUT update status (employees only)
const updateStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!status && status !== false) {
    return res.status(400).json({ message: "Transaction status is required." });
  }

  try {
    const transaction = await Transaction.findByIdAndUpdate(
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

    if (!transaction) return res.status(404).json({ message: "Transaction not found." });

    res.status(202).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE transaction (employees only)
const deleteTransaction = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Transaction ID is required." });

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found." });

    res.status(202).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTransactions, getTransaction, createTransaction, updateStatus, deleteTransaction};