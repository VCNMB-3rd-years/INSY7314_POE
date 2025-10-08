// calling in express to use its methods and functionality
const express = require('express');

// call in our functions from the controller
const { updateCustomer, getCustomers, getCustomer} = require('../controllers/customerController.js');

// set up our router instance
const router = express.Router();

// define our routes/endpoints
// when updating a customer, we want to update a SPECIFIC one, so we specify the ID
router.put('/:id', updateCustomer);
// define our routes/endpoints
router.get('/', getCustomers);
// to get a specific transaction, we pass through that transactions ID
router.get('/:id', getCustomer);
// finally we export our routes
module.exports = router;