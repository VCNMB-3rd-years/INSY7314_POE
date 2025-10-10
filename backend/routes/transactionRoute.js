// server/routes/transactions.js
const express = require('express');
const {
  getTransaction,
  getTransactions,
  createTransaction,
  updateStatus,
  deleteTransaction
} = require('../controllers/transactionController.js');

const validateRequest = require('../middlewares/validateRequest');
const txSchemas = require('../schemas/transactionSchemas.js');

const { verifyToken } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// GET /api/transactions/getTransactions
router.get('/getTransactions', getTransactions);

// GET /api/transactions/:id
router.get('/:id', validateRequest(txSchemas.getTransaction), getTransaction);

// POST /api/transactions/createTransaction
router.post(
  '/createTransaction',
  verifyToken,  
  validateRequest(txSchemas.createTransaction),
  createTransaction
);

// PUT /api/transactions/:id
router.put('/:id', validateRequest(txSchemas.updateStatus), updateStatus);

// DELETE /api/transactions/:id
router.delete('/:id', validateRequest(txSchemas.getTransaction), deleteTransaction);

module.exports = router;
