// controllers/customerController.js
const Customer = require("../models/customerModel.js");

// PUT: update an existing customer
const updateCustomer = async (req, res) => {
  // first we get the ID from the url
  const id = req.params.id;
  // then the updated information from the body
  const { nationalId, firstName, lastName, username, password } = req.body;

  try {
    // firstly find the customer we need to update
    const customer = await Customer.findById(id);

    // if no customer, inform the user and don't proceed any further
    if (!customer) {
      res.status(404).json({ message: "No customer found that matches that ID." });
    }

    // otherwise, we then update the updated fields
    // finally, ensure that the new version (post update) is returned, rather than the old customer
    customer = await Customer.findByIdAndUpdate(
      id,
      { nationalId, firstName, lastName, username, password },
      { new: true }
    );
   
    res.status(202).json(customer);
  } catch (error) {
    // if things go south, spit out the error message
    res.status(500).json({ error: error.message });
  }
};

// GET: all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    // return the customers
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: get a singluar customers by id
const getCustomer = async (req, res) => {
  // get the id of the customers that the user is looking for, from the parameters
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to search for!" });
  }

  try {
    // try find the customers using the provided ID
    const customers = await Customer.findById(id);

    // if no customers is found matching the provided ID, we should return 404 with an informative message
    if (!customers) {
      res.status(404).json({ message: "No customers found that matches that ID." });
    }

    // otherwise, return the customers
    res.status(200).json(customers);
  } catch (error) {
    // throw a server error if an issue occurs
    res.status(500).json({ error: error.message });
  }
};


module.exports = {updateCustomer, getCustomers, getCustomer};