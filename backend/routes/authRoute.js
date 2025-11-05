const express = require('express');
const { register, login, logout, testPassword } = require('../controllers/authController.js');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

const registerSchema = {
  body: {
    userType: /^(customer|employee)$/,
    username: 'username',
    password: 'password',
    firstName: 'fullName',
    lastName: 'fullName',
    nationalId: 'nationalId'
  }
};  

const loginSchema = {
  body: {
    userType: /^(customer|employee)$/,
    username: 'username',
    password: 'password'
  }
};

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/test-password', testPassword);
router.get('/logout', logout);

module.exports = router;