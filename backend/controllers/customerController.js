// controllers/customerController.js
const Customer = require("../models/customerModel");

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
    // spit it out encoded in json
    res.status(202).json(customer);
  } catch (error) {
    // if things go south, spit out the error message
    res.status(500).json({ error: error.message });
  }
};

