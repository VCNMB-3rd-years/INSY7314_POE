// server/app.js
const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { connectToMongo } = require("./services/dbService.js");
const fs = require("fs");
const https = require("https");

// import routes
const authRoute = require("./routes/authRoute.js");
const bankRoute = require("./routes/bankRoute.js");
const customerRoute = require("./routes/customerRoute.js");
const transactionRoute = require("./routes/transactionRoute.js");

// initialize express
const app = express();

// ---------- Global Middlewares ----------

// Parse JSON safely with 20kb limit
app.use(express.json({ limit: "20kb" }));

// Basic security headers (X-Frame, CSP, XSS filters, etc.)
app.use(helmet());

// Logger: shows request info in dev
app.use(morgan("dev"));

// Basic rate limiter (protects early from brute force)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ---------- Routes ----------
app.use("/v1/auth", authRoute);
app.use("/v1/bank", bankRoute);
app.use("/v1/customer", customerRoute);
app.use("/v1/transaction", transactionRoute);

// ---------- Error Handling ----------
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ---------- Start Server ----------
const port = process.env.API_PORT || 3000;

const options = {
  key: fs.readFileSync("./certs/localhost+1-key.pem"),
  cert: fs.readFileSync("./certs/localhost+1.pem"),
};

connectToMongo();

https.createServer(options, app).listen(port, () => {
  console.log(`✅ Secure API running on https://localhost:${port}`);
});
