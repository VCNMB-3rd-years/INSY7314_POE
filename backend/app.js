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

const securityMiddlewares = require("./middlewares/securityMiddleware.js");
//Input Sanitization imports
// const mongoSanitize = require('express-mongo-sanitize')
//const xss = require('xss-clean')

// initialize express
const app = express();

// ---------- Global Middlewares ----------

// Parse JSON safely with 20kb limit
app.use(express.json({ limit: "20kb" }));

// Basic security headers (X-Frame, CSP, XSS filters, etc.)
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production"
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"], // allow inline styles if needed
              imgSrc: ["'self'"],
              connectSrc: ["'self'"], // restrict API/WebSocket connections
              objectSrc: ["'none'"],
              upgradeInsecureRequests: [],
            },
          }
        : false, // 🔓 disables CSP when running locally with Vite dev server
    crossOriginEmbedderPolicy: false, // prevents CORS issues with Vite
  })
);

// Force HTTPS in production (redirect HTTP → HTTPS)
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      // Redirect to HTTPS
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
} 
// set up our security middleware
securityMiddlewares(app);

// log every request
// the logger will look at the request, generate a response, then handle the next incoming request
app.use((req, res, next) => {
    // print out to the console (terminal) what type of method was used and to what endpoint that request was made
    console.log(`${req.method} ${req.url}`)
    // prepare to handle the next incoming request
    next();
  });

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

