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

// GET: get a singluar transaction by id
const getTransaction = async (req, res) => {
  // get the id of the transaction that the user is looking for, from the parameters
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to search for!" });
  }

  try {
    // try find the transaction using the provided ID
    const transaction = await Transaction.findById(id);

    // if no transaction is found matching the provided ID, we should return 404 with an informative message
    if (!transaction) {
      res.status(404).json({ message: "No transaction found that matches that ID." });
    }

    // otherwise, return the transaction
    res.status(200).json(transaction);
  } catch (error) {
    // throw a server error if an issue occurs
    res.status(500).json({ error: error.message });
  }
};


// POST: create a transaction
const createTransaction = async (req, res) => {
  const { status, recipientReference, customerReference, amount } = req.body;

  // Make sure the customerId comes from the logged-in user
  const customerId = req.user.customerId;

  if (!recipientReference || !customerReference || !amount) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  try {
    const transaction = await Transaction.create({
      status: status,
      recipientReference,
      customerReference,
      amount,
      customerId
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// PUT: verify swift transaction code
const updateStatus = async (req, res) => {
  // first we get the ID from the url
  const id = req.params.id;
  // then the updated information from the body
  const { status, recipientReference, customerReference, amount, customerId} = req.body;

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
      { status, recipientReference, customerReference, amount, customerId},
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

// GET: get a singluar transaction by id
const getTransaction = async (req, res) => {
  // get the id of the transaction that the user is looking for, from the parameters
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to search for!" });
  }

  try {
    // try find the transaction using the provided ID
    const transaction = await Transaction.findById(id);

    // if no transaction is found matching the provided ID, we should return 404 with an informative message
    if (!transaction) {
      res.status(404).json({ message: "No transaction found that matches that ID." });
    }

    // otherwise, return the transaction
    res.status(200).json(transaction);
  } catch (error) {
    // throw a server error if an issue occurs
    res.status(500).json({ error: error.message });
  }
};


// POST: create a transaction
const createTransaction = async (req, res) => {
  const { status, recipientReference, customerReference, amount } = req.body;

  // Make sure the customerId comes from the logged-in user
  const customerId = req.user.customerId;

  if (!recipientReference || !customerReference || !amount) {
    return res.status(400).json({ message: "Please provide all required fields." });
  }

  try {
    const transaction = await Transaction.create({
      status: status,
      recipientReference,
      customerReference,
      amount,
      customerId
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// PUT: verify swift transaction code
const updateStatus = async (req, res) => {
  // first we get the ID from the url
  const id = req.params.id;
  // then the updated information from the body
  const { status, recipientReference, customerReference, amount, customerId} = req.body;

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
      { status, recipientReference, customerReference, amount, customerId},
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