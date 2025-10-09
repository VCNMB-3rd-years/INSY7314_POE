const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  transactionId: { type: String, default: () => crypto.randomUUID() },
  status: {type: Boolean, default: false},
  recipientReference: String,
  customerReference: String,
  amount: Number,
  //fk
  customerId: [{ type: String,ref: "customerModel" }]
});
// we then define that the object references that schema, and give it a name
const Transaction = mongoose.model('Transaction', TransactionSchema);

// finally we export our object, so that we can reference it in other files
// we will use our object in the controllers, so that we can interface with the database
module.exports = Transaction;