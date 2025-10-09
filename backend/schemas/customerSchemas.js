// server/schemas/customerSchemas.js
module.exports = {
  updateCustomer: {
    params: { id: 'objectId' },
    body: {
      nationalId: { pattern: 'nationalId', optional: true },
      firstName: { pattern: /^[A-Za-z ,.'-]{2,40}$/, optional: true },
      lastName: { pattern: /^[A-Za-z ,.'-]{2,40}$/, optional: true },
      username: { pattern: 'username', optional: true },
      password: { pattern: 'password', optional: true }
    }
  },

  getCustomer: {
    params: { id: 'objectId' }
  },

  deleteCustomer: {
    params: { id: 'objectId' }
  }
};
