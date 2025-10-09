// /server/schemas/transactionSchemas.js
module.exports = {
  createTransaction: {
    body: {
      status: { pattern: 'status', optional: true },
      customerBankId: 'objectId',
      amount: 'amount',
      currency: 'currency',
      provider: 'provider',
      payee_account: { pattern: 'accountNumber', optional: false },
      swift_code: { pattern: 'swift', optional: false }
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
