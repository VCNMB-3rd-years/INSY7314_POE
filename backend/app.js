// server/app.js
const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const sanitize = require("mongo-sanitize");
const fs = require("fs");
const https = require("https");
const securityMiddlewares = require('./middlewares/securityMiddleware.js');


const authRoute = require("./routes/authRoute.js");
const bankRoute = require("./routes/bankRoute.js");
const customerRoute = require("./routes/customerRoute.js");
const transactionRoute = require("./routes/transactionRoute.js");


const app = express();


app.use(express.json({ limit: '20kb' }));

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

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
} 
securityMiddlewares(app);


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next();
  });

app.use((req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.params) req.params = sanitize(req.params);
  next();
});

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(morgan('dev'));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    standardHeaders: true,
    legacyHeaders: false,
  })
);


app.use("/v1/auth", authRoute);
app.use("/v1/bank", bankRoute);
app.use("/v1/customer", customerRoute);
app.use("/v1/transaction", transactionRoute);


app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.API_PORT || 3000;

const options = {
  key: fs.readFileSync("./certs/localhost+1-key.pem"),
  cert: fs.readFileSync("./certs/localhost+1.pem"),
};

module.exports = app;

https.createServer(options, app).listen(port, () => {
  console.log(`✅ Secure API running on https://localhost:${port}`);
});

