// models/bankModel.js
const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema({
  bankName: String,
  swiftCode: String
});

module.exports = mongoose.model("bankModel", BankSchema);
