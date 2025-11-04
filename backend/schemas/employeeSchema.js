// schemas/employeeSchema.js
const Joi = require("joi");

const createEmployee = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

const updateEmployee = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  password: Joi.string().min(6).optional(),
});

const getEmployee = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.length": "Employee ID must be a valid 24-character MongoDB ObjectId",
  }),
});

module.exports = {
  createEmployee,
  updateEmployee,
  getEmployee,
};
