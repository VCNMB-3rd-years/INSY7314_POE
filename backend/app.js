// app.js
const express = require('express');
require('dotenv').config();
const { connectToMongo } = require('./services/dbServices');

// Import routes
const coinnectRoute = require('./routes/coinnectRoute.js');

// Initialize express
const app = express();

// Middleware for JSON parsing (required!)
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount routes under versioned path
app.use('/v1/coinnect', coinnectRoute);

// Port setup
const port = process.env.API_PORT || 3000;

// Connect to Mongo
connectToMongo();

// Start server
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
