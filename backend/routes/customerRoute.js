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

const router = express.Router();

// PUT /api/customers/:id
router.put('/:id', validateRequest(customerSchemas.updateCustomer), updateCustomer);

// GET /api/customers/getCustomers
router.get('/getCustomers', getCustomers);

// GET /api/customers/:id
router.get('/:id', validateRequest(customerSchemas.getCustomer), getCustomer);

// DELETE /api/customers/:id
router.delete('/:id', validateRequest(customerSchemas.deleteCustomer), deleteCustomer);

module.exports = router;
