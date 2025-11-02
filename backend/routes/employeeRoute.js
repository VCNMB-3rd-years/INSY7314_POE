const express = require('express');
const {
   getPendingTransactions, getVerifiedTransactions, getOneTransaction, updateStatus
} = require('../controllers/employeeController.js');

const validateRequest = require('../middlewares/validateRequest');
const txSchemas = require('../schemas/employeeSchemas.js');
const { verifyToken, authorizeRole, } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// GET all pending transactions
router.get('/getPendingTransactions', verifyToken, getPendingTransactions);

// GET all pending transactions
router.get('/getVerifiedTransactions', verifyToken, getVerifiedTransactions);

// GET a transaction by ID
router.get('/:id', verifyToken, validateRequest(txSchemas.getOneTransaction), getOneTransaction);

// PUT update status
router.put(
  '/:id',
  verifyToken,
  authorizeRole(['employee']),
  validateRequest(txSchemas.updateStatus),
  updateStatus
);

module.exports = router;
