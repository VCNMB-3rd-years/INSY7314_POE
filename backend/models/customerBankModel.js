const mongoose = require('mongoose');

const CustomerBankSchema = new mongoose.Schema({
  customerBankId: { type: String, default: () => crypto.randomUUID() },
  accountNumber: Number,
  //fk
  customerId: [{ type: String, ref: "customerModel" }],
  bankId: [{ type: String, ref: "bankModel" }]
});
// we then define that the object references that schema, and give it a name
const CustomerBank = mongoose.model('CustomerBank', CustomerBankSchema);

// finally we export our object, so that we can reference it in other files
// we will use our object in the controllers, so that we can interface with the database
module.exports = CustomerBank;
