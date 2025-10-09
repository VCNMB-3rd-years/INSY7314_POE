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
const getTransaction = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Transaction ID is required." });

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) return res.status(404).json({ message: "Transaction not found." });

    // Customers can only access their own transactions
    if (req.user.userType === 'customer' && transaction.customerId !== req.user.customerId) {
      return res.status(403).json({ message: "Forbidden: not your transaction." });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      id,
      { status },
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

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateStatus,
  deleteTransaction
};
