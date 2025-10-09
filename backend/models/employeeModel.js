const mongoose = require('mongoose');
const crypto = require('crypto');

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, default: () => crypto.randomUUID() },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Export model
const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
