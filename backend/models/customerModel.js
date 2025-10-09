// server/models/customerModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, default: () => crypto.randomUUID() },
  nationalId: Number,
  firstName: String,
  lastName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  customerBankId: [{ type: String, ref: "customerBankModel" }]
});

// Hash password before saving
CustomerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
