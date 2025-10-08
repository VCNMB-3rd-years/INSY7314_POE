// calling in express to use its methods and functionality
const express = require('express');

// call in our functions from the controller
const { getBank, getBanks} = require('../controllers/bankController.js');

// set up our router instance
const router = express.Router();

// define our routes/endpoints
// to get all banks, we don't need to pass through the specific id of that bank
router.get('/', getBanks);
// to get a specific book, we pass through that bank's ID
router.get('/:id', getBank);

// finally we export our routes
module.exports = router;