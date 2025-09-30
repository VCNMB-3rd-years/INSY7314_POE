// models/employeeModel.js
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  username: String,
  password: String
});

module.exports = mongoose.model("employeeModel", EmployeeSchema);
