// models/bankModel.js
const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
  bankId: { type: String, default: () => crypto.randomUUID() },
  bankName: String,
  swiftCode: String
});
// we then define that the object references that schema, and give it a name
const Bank = mongoose.model('Bank', BankSchema);

// finally we export our object, so that we can reference it in other files
// we will use our object in the controllers, so that we can interface with the database
module.exports = Bank;
