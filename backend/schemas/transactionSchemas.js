// /server/schemas/transactionSchemas.js
module.exports = {
  createTransaction: {
    body: {
      status: { default: 'pending', optional: true },
      customerId: 'objectId',
      amount: 'number',
      recipientReference: { type: 'string', optional: true },
      customerReference: { type: 'string', optional: true },
      swiftCode: { pattern: 'swift', optional: true },
    }
  },

  updateStatus: {
    params: { id: 'objectId' },
    body: { status: 'string' }
  },

  getTransaction: {
    params: { id: 'objectId' }
  }
};

