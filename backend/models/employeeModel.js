const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, default: () => crypto.randomUUID() },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

EmployeeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

EmployeeSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;