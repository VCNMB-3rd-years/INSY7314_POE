// routes/coinnectRoute.js
const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
const transactionController = require("../controllers/transactionController");
const bankController = require("../controllers/bankController");

// Customer
router.post("/registerCustomer", customerController.registerCustomer);
router.put("/updateCustomer/:id", customerController.updateCustomer);
router.post("/login", customerController.login);

// Transactions
router.get("/getTransactions", transactionController.getTransactions);
router.get("/getTransactionByID/:id", transactionController.getTransactionByID);
router.post("/makeTransaction", transactionController.makeTransaction);
router.put("/updateStatus/:transactionId", transactionController.updateStatus);

// Banks
router.get("/getBank", bankController.getBank);

module.exports = router;
