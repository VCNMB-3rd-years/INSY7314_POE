const express = require('express');
const {
  getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee
} = require('../controllers/adminController.js');

const validateRequest = require('../middlewares/validateRequest');
const txSchemas = require('../schemas/adminSchemas.js');
const { verifyToken, authorizeRole, } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// GET all employees
router.get('/getEmployees', verifyToken, getEmployees);

// GET a employee by ID
router.get('/:id', verifyToken, validateRequest(txSchemas.getEmployee), getEmployee);

// POST create transaction — customers only
router.post(
  '/createEmployee',
  verifyToken,
  authorizeRole(['admin']),
  validateRequest(txSchemas.createEmployee),
  createEmployee
);

// PUT update employees
router.put(
  '/:id',
  verifyToken,
  authorizeRole(['admin']),
  validateRequest(txSchemas.updateEmployee),
  updateEmployee
);

// DELETE transaction — employees only
router.delete(
  '/:id',
  verifyToken,
  authorizeRole(['admin']),
  validateRequest(txSchemas.getEmployee),
  deleteEmployee
);

module.exports = router;
