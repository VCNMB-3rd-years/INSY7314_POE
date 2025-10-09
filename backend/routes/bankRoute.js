// server/routes/bankRoutes.js
const express = require('express');
const {
  getBanks,
  getBank,
  createBank,
  updateBank,
  deleteBank
} = require('../controllers/bankController.js');

const validateRequest = require('../middleware/validateRequest');
const bankSchemas = require('../schemas/bankSchemas.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Middleware to check if the user is an employee
const requireEmployee = (req, res, next) => {
  if (req.user.userType !== 'employee') {
    return res.status(403).json({ message: 'Access denied: employees only' });
  }
  next();
};

// GET all banks - any authenticated user
router.get('/getBanks', verifyToken, getBanks);

// GET specific bank - any authenticated user
router.get('/:id', verifyToken, getBank);

// CREATE a bank - employees only
router.post(
  '/createBank',
  verifyToken,
  requireEmployee,
  validateRequest(bankSchemas.createBank),
  createBank
);

// UPDATE a bank - employees only
router.put(
  '/:id',
  verifyToken,
  requireEmployee,
  validateRequest(bankSchemas.updateBank),
  updateBank
);

// DELETE a bank - employees only
router.delete('/:id', verifyToken, requireEmployee, deleteBank);

module.exports = router;
