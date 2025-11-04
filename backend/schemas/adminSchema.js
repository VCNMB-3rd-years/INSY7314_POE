// schemas/adminSchema.js
const Joi = require("joi");

const createAdmin = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

const updateAdmin = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  password: Joi.string().min(6).optional(),
});

const getAdmin = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.length": "Admin ID must be a valid 24-character MongoDB ObjectId",
  }),
});

module.exports = {
  createAdmin,
  updateAdmin,
  getAdmin,
};
