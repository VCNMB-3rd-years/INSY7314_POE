// controllers/adminController.js
const Employee = require("../models/employeeModel.js");

// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}, "-password"); // exclude passwords
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET 1 EMPLOYEE BY ID
const getEmployee = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ message: "Employee ID required." });

  try {
    const employee = await Employee.findById(id, "-password");
    if (!employee)
      return res.status(404).json({ message: "Employee not found." });

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({
        message: "Username, password, and role are required.",
      });
    }

    const existing = await Employee.findOne({ username });
    if (existing)
      return res.status(409).json({ message: "Username already exists." });

    const newEmployee = await Employee.create({ username, password, role });

    res.status(201).json({
      message: "Employee created successfully.",
      employee: {
        id: newEmployee._id,
        username: newEmployee.username,
        role: newEmployee.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true, select: "-password" }
    );

    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found." });

    res.status(202).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Employee not found." });

    res.status(202).json({
      message: "Employee deleted.",
      employee: deleted,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
