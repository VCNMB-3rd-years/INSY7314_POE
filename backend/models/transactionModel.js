// server/models/transactionModel.js
const mongoose = require('mongoose');
const crypto = require('crypto');

const TransactionSchema = new mongoose.Schema({
  transactionId: { type: String, default: () => crypto.randomUUID() },
  status: { type: Boolean, required: true },
  // link to customer by customerId (from Customer model)
  customerId: { type: String, ref: "Customer", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Auto-update updatedAt on save
TransactionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
