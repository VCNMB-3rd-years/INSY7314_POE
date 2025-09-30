// controllers/transactionController.js
const Customer = require("../models/customerModel");

// GET: getTransactions
exports.getTransactions = async (req, res) => {
  try {
    const customers = await Customer.find({}, "accounts.transactions");
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: getTransactionByID
exports.getTransactionByID = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({ "accounts.transactions._id": id }, { "accounts.$": 1 });
    if (!customer) return res.status(404).json({ error: "Transaction not found" });
    res.json(customer.accounts[0].transactions.id(id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: makeTransaction
exports.makeTransaction = async (req, res) => {
  try {
    const { customerId, accountNumber, status } = req.body;
    const customer = await Customer.findById(customerId);
    const account = customer.accounts.find(acc => acc.accountNumber === accountNumber);
    if (!account) return res.status(404).json({ error: "Account not found" });

    account.transactions.push({ status });
    await customer.save();
    res.status(201).json(account.transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT: updateStatus
exports.updateStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { status } = req.body;

    const customer = await Customer.findOne({ "accounts.transactions._id": transactionId });
    if (!customer) return res.status(404).json({ error: "Transaction not found" });

    const account = customer.accounts.find(acc =>
      acc.transactions.id(transactionId)
    );
    account.transactions.id(transactionId).status = status;

    await customer.save();
    res.json(account.transactions.id(transactionId));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
