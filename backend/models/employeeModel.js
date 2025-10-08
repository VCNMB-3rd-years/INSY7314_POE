// models/employeeModel.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, default: () => crypto.randomUUID() },
  username: String,
  password: String
});

// we then define that the object references that schema, and give it a name
const Employee = mongoose.model('Employee', EmployeeSchema);

// finally we export our object, so that we can reference it in other files
// we will use our object in the controllers, so that we can interface with the database
module.exports = Employee;