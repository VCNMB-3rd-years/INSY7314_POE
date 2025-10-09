const express = require('express');
const {
  getTransaction,
  getTransactions,
  createTransaction,
  updateStatus,
  deleteTransaction
} = require('../controllers/transactionController.js');

const validateRequest = require('../middleware/validateRequest');
const txSchemas = require('../schemas/transactionSchemas.js');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware.js');

const router = express.Router();

// GET all transactions — customer sees own, employee sees all
router.get('/getTransactions', verifyToken, getTransactions);

// GET a transaction by ID — only owner (customer) or employee
router.get('/:id', verifyToken, validateRequest(txSchemas.getTransaction), getTransaction);

// POST create transaction — customers only
router.post(
  '/createTransaction',
  verifyToken,
  authorizeRole(['customer']),
  validateRequest(txSchemas.createTransaction),
  createTransaction
);

// PUT update status — employees only
router.put(
  '/:id',
  verifyToken,
  authorizeRole(['employee']),
  validateRequest(txSchemas.updateStatus),
  updateStatus
);

// DELETE transaction — employees only
router.delete(
  '/:id',
  verifyToken,
  authorizeRole(['employee']),
  validateRequest(txSchemas.getTransaction),
  deleteTransaction
);

module.exports = router;
