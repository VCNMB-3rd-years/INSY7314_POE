const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, default: () => crypto.randomUUID() },
  nationalId: String,
  firstName: String,
  lastName: String,
  username: String,
  accountNumber: Number,
  password: String,
  //fk
  //customerBankId: [{ type: String, ref: "customerBankModel" }]
});

// Hash password before saving
CustomerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare plain password with hashed password
CustomerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
