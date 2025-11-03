//controllers/transactionController.js
const Transaction = require("../models/transactionModel.js");

// GET method to view a list of all the pending transactions of all customers
const getPendingTransactions = async (req, res) => {
  try {
    // Find all transactions where status is "pending"
    const pendingTransactions = await Transaction.find({ status: 'pending' });

    // Return the transactions
    res.status(200).json(pendingTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET method to view all the previously approved or denied transactions made by customers
const getVerifiedTransactions = async (req, res) => {
  try {
    const verifiedTransactions = await Transaction.find({ status: { $in: ['approved', 'denied'] }});
    // return the verified transactions
    res.status(200).json(verifiedTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: get a singluar transaction by id
const getOneTransaction = async (req, res) => {
  // get the id of the transaction that the user is looking for, from the parameters
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to search for!" });
  }

  try {
    // try find the transactions using the provided ID
    const transactions = await Transaction.findById(id);

    // if no transactions is found matching the provided ID, we should return 404 with an informative message
    if (!transactions) {
      res.status(404).json({ message: "No transactions found that matches that ID." });
    }

    // otherwise, return the transactions
    res.status(200).json(transactions);
  } catch (error) {
    // throw a server error if an issue occurs
    res.status(500).json({ error: error.message });
  }
};

// PUT method to update swift code status (approve or deny) of a particular customer
const updateStatus = async (req, res) => {
  // first we get the ID from the url
  const id = req.params.id;
  // then the updated information from the body
  const {  status, recipientReference, customerReference, amount, swiftCode } = req.body;

  try {
    // firstly find the transaction we need to update
    const transaction = await Transaction.findById(id);

    // if no transaction, inform the user and don't proceed any further
    if (!transaction) {
      res.status(404).json({ message: "No transaction found that matches that ID." });
    }
    
    const updatedStatus = await Employee.findByIdAndUpdate(
      id,
      { status, recipientReference, customerReference, amount, swiftCode },
      { new: true }
    );
   
    res.status(202).json(transaction);
  } catch (error) {
    // if things go south, spit out the error message
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPendingTransactions, getVerifiedTransactions, getOneTransaction, updateStatus};