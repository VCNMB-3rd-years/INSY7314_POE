// server/app.js
const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const sanitize = require("mongo-sanitize");
const securityMiddlewares = require("./middlewares/securityMiddleware.js");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

// Route imports
const authRoute = require("./routes/authRoute.js");
const bankRoute = require("./routes/bankRoute.js");
const customerRoute = require("./routes/customerRoute.js");
const transactionRoute = require("./routes/transactionRoute.js");

const app = express();

// ---------- Security & Core Setup ----------
app.use(express.json({ limit: "20kb" }));

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

app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

securityMiddlewares(app);

// ---------- Utility Middlewares ----------
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.params) req.params = sanitize(req.params);
  next();
});

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(morgan("dev"));

// ---------- Adaptive Rate Limiting ----------

// General requests (default)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

// Login endpoint limiter
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5, // 5 attempts per 10 minutes
  message: "Too many login attempts. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Registration endpoint limiter
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 registrations per hour
  message: "Too many registration attempts from this IP. Try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply general limiter globally
app.use(generalLimiter);
// Apply specific limiters to critical routes
app.use("/v1/auth/login", loginLimiter);
app.use("/v1/auth/register", registerLimiter);

// ---------- CSRF Protection ----------
app.use(cookieParser());
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  },
});

// Apply CSRF to all unsafe methods
app.use((req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  csrfProtection(req, res, next);
});

// Provide CSRF token endpoint for frontend
app.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

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

module.exports = app;
