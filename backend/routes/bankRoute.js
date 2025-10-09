// server/routes/banks.js
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

const router = express.Router();

// GET /api/banks/getBanks
router.get('/getBanks', getBanks);

// GET /api/banks/:id
router.get('/:id', validateRequest(bankSchemas.getBank), getBank);

// POST /api/banks/createBank
router.post('/createBank', validateRequest(bankSchemas.createBank), createBank);

// PUT /api/banks/:id
router.put('/:id', validateRequest(bankSchemas.updateBank), updateBank);

// DELETE /api/banks/:id
router.delete('/:id', validateRequest(bankSchemas.getBank), deleteBank);

module.exports = router;
