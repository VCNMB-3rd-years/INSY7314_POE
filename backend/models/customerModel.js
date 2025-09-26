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
   nationalId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accounts: [AccountSchema],
});

module.exports = mongoose.model("customerModel", CustomerSchema);
