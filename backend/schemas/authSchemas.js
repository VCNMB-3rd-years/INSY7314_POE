// /server/schemas/authSchemas.js
module.exports = {
  registerSchema: {
    body: {
      userType: { pattern: /^(customer|employee)$/, optional: false },
      username: 'username',
      password: 'password',
      fullName: { pattern: 'fullName', optional: true },
      nationalId: { pattern: 'nationalId', optional: true },
      accountNumber: { pattern: 'accountNumber', optional: true }
    }
  },

  loginSchema: {
    body: {
      userType: { pattern: /^(customer|employee)$/, optional: false },
      username: 'username',
      password: 'password'
    }
  }
};
