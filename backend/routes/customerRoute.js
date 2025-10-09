// server/routes/customers.js
const express = require('express');
const {
  updateCustomer,
  getCustomers,
  getCustomer,
  deleteCustomer
} = require('../controllers/customerController.js');

const validateRequest = require('../middleware/validateRequest');
const customerSchemas = require('../schemas/customerSchemas.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

// PUT /api/customers/:id
router.put(
  '/:id',
  verifyToken, // <--- protect this route
  validateRequest(customerSchemas.updateCustomer),
  updateCustomer
);

// GET /api/customers/getCustomers
router.get('/getCustomers', verifyToken, getCustomers);

// GET /api/customers/:id
router.get(
  '/:id',
  verifyToken,
  validateRequest(customerSchemas.getCustomer),
  getCustomer
);

// DELETE /api/customers/:id
router.delete(
  '/:id',
  verifyToken,
  validateRequest(customerSchemas.deleteCustomer),
  deleteCustomer
);
module.exports = router;
