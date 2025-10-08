// calling in express to use its methods and functionality
const express = require('express');

// call in our functions from the controller
const { updateCustomer, getCustomers, getCustomer, deleteCustomer} = require('../controllers/customerController.js');

// set up our router instance
const router = express.Router();

// define our routes/endpoints
// when updating a customer, we want to update a SPECIFIC one, so we specify the ID
router.put('/:id', updateCustomer);
router.get('/getCustomers', getCustomers);
router.get('/:id', getCustomer);
router.delete('/:id', deleteCustomer)
// finally we export our routes
module.exports = router;