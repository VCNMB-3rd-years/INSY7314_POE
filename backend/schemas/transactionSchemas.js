// /server/schemas/transactionSchemas.js
module.exports = {
  createTransaction: {
    body: {
      status: { default: 'pending', optional: true },
      customerId: 'objectId',
      amount: 'amount',
      //currency: 'currency',
      //provider: 'provider',
      //payee_account: { pattern: 'accountNumber', optional: false },
      swiftCode: { pattern: 'swift', optional: false }
    }
  },

  updateStatus: {
    params: { id: 'objectId' },
    body: { status: 'status' }
  },

  getTransaction: {
    params: { id: 'objectId' }
  }
};
