// calling in express to use its methods and functionality
const express = require('express');

// call in our functions from the controller
const { updateCustomer} = require('../controllers/customerController.js');

// set up our router instance
const router = express.Router();

// define our routes/endpoints
// when updating a customer, we want to update a SPECIFIC one, so we specify the ID
router.put('/:id', updateCustomer);

// finally we export our routes
module.exports = router;