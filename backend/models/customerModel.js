// models/customerModel.js
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  transactionId: mongoose.Schema.Types.ObjectId,
  status: String
});

const AccountSchema = new mongoose.Schema({
  accountNumber: String,
  bankId: { type: mongoose.Schema.Types.ObjectId, ref: "bankModel" },
  transactions: [TransactionSchema]
});

const CustomerSchema = new mongoose.Schema({
  nationalId: String,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  accounts: [AccountSchema]
});

module.exports = mongoose.model("customerModel", CustomerSchema);
