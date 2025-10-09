// /server/schemas/bankSchemas.js
module.exports = {
  createBank: {
    body: {
      bankName: { pattern: /^[A-Za-z0-9 &,'-]{2,80}$/, optional: false },
      swiftCode: 'swift'
    }
  },

  updateBank: {
    params: { id: 'objectId' },
    body: {
      bankName: { pattern: /^[A-Za-z0-9 &,'-]{2,80}$/, optional: true },
      swiftCode: { pattern: 'swift', optional: true }
    }
  },

  getBank: {
    params: { id: 'objectId' }
  }
};
