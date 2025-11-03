// controllers/customerController.js
const Employee = require("../models/employeeModel.js");

// GET method to view list of all employees and fields, except passwords
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    // return the employees
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: get a singluar employee by id
const getEmployee = async (req, res) => {
  // get the id of the employees that the user is looking for, from the parameters
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to search for!" });
  }

  try {
    // try find the employees using the provided ID
    const employees = await Customer.findById(id);

    // if no employees is found matching the provided ID, we should return 404 with an informative message
    if (!employees) {
      res.status(404).json({ message: "No employees found that matches that ID." });
    }

    // otherwise, return the employees
    res.status(200).json(employees);
  } catch (error) {
    // throw a server error if an issue occurs
    res.status(500).json({ error: error.message });
  }
};

// POST method to create a new employee
const createEmployee = async (req, res) => {
  try {
    // Ensure the user is logged in and has an ID
    if (!req.user || !req.user.adminId) {
      return res.status(401).json({ message: "Unauthorized — please log in first." });
    }

    const { username, password } = req.body;
    const customerId = req.user.customerId; 

    // Validate required fields
    if (!recipientReference || !customerReference || !amount || !swiftCode) {
      return res.status(400).json({
        message: "Missing required fields: recipientReference, customerReference, swift code or amount."
      });
    }

    // Create the transaction
    const transaction = await Transaction.create({
      status,
      recipientReference,
      customerReference,
      amount,
      customerId,
      swiftCode
    });

    res.status(201).json({
      message: "Transaction created successfully.",
      transaction
    });
  } catch (error) {
    console.error("Create Transaction Error:", error);
    res.status(500).json({
      message: "An error occurred while creating the transaction.",
      error: error.message
    });
  }
};


// PUT method to update an employee's account details
const updateEmployee = async (req, res) => {
  // first we get the ID from the url
  const id = req.params.id;
  // then the updated information from the body
  const { username, password } = req.body;

  try {
    // firstly find the employee we need to update
    const employee = await Employee.findById(id);

    // if no employee, inform the user and don't proceed any further
    if (!employee) {
      res.status(404).json({ message: "No employee found that matches that ID." });
    }
    
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { username, password },
      { new: true }
    );
   
    res.status(202).json(employee);
  } catch (error) {
    // if things go south, spit out the error message
    res.status(500).json({ error: error.message });
  }
};

// DELETE method to remove an employee
const deleteEmployee = async (req, res) => {
  // get the id of the employee we want to remove
  const id = req.params.id;

  // null check
  if (!id) {
    res.status(400).json({ message: "Please provide an ID to delete." });
  }

  // first try find the employee
  try {
    var employee = await Employee.findById(id);

    // if no employee, 404 and exit the method
    if (!employee) {
      res.status(404).json({ message: "No employee found that matches that ID." });
    }

    // find the employee, delete it, and return what it was
    employee = await Employee.findByIdAndDelete(id);
    res.status(202).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee};