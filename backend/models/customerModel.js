const crypto = require("crypto");

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, default: () => crypto.randomUUID() },
  nationalId: Number,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  //fk
  customerBankId: [{ type: String, ref: "customerBankModel" }]
});
// we then define that the object references that schema, and give it a name
const Customer = mongoose.model('Customer', CustomerSchema);

// finally we export our object, so that we can reference it in other files
// we will use our object in the controllers, so that we can interface with the database
module.exports = Customer;