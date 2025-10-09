const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  transactionId: { type: String, default: () => crypto.randomUUID() },
  status: Boolean,
  //fk
  customerBankId: [{ type: String, ref: "customerBankModel" }]
});
// we then define that the object references that schema, and give it a name
const Transaction = mongoose.model('Transaction', TransactionSchema);

// finally we export our object, so that we can reference it in other files
// we will use our object in the controllers, so that we can interface with the database
module.exports = Transaction;