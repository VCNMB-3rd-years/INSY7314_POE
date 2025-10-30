// server/app.js
const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const sanitize = require("mongo-sanitize");
const securityMiddlewares = require("./middlewares/securityMiddleware.js");

// Route imports
const authRoute = require("./routes/authRoute.js");
const bankRoute = require("./routes/bankRoute.js");
const customerRoute = require("./routes/customerRoute.js");
const transactionRoute = require("./routes/transactionRoute.js");

const app = express();

// ---------- Security & Core Setup ----------
app.use(express.json({ limit: "20kb" }));

// Helmet: adds standard HTTP headers for security
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production"
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'"],
              connectSrc: ["'self'"],
              objectSrc: ["'none'"],
              upgradeInsecureRequests: [],
            },
          }
        : false,
    crossOriginEmbedderPolicy: false,
  })
);

// Enforce HSTS (force HTTPS in browsers)
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);

// Force HTTPS in production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Add your custom security middlewares (e.g., CSP, CORS)
securityMiddlewares(app);

// ---------- Utility Middlewares ----------
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Sanitize request data to prevent NoSQL injection
app.use((req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.params) req.params = sanitize(req.params);
  next();
});

// Disable caching for security-sensitive data
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Request logging
app.use(morgan("dev"));

// Rate limiter: limits each IP to 100 requests per 15 minutes
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ---------- API Routes ----------
app.use("/v1/auth", authRoute);
app.use("/v1/bank", bankRoute);
app.use("/v1/customer", customerRoute);
app.use("/v1/transaction", transactionRoute);

// ---------- Global Error Handler ----------
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Export app (server.js handles HTTPS + DB connection)
module.exports = app;
