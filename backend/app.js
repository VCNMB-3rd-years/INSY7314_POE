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


// import routes
const authRoute = require('./routes/authRoute.js');
const bankRoute = require('./routes/bankRoute.js');
const customerRoute = require('./routes/customerRoute.js');
const transactionRoute = require('./routes/transactionRoute.js');

//mkcerts imports
const https = require('https');
const fs = require('fs');

//create new variables to hold where our certificate lives we did "npm install 'fs'"
const options ={
    key: fs.readFileSync('./certs/localhost+1-key.pem'),
    cert: fs.readFileSync('./certs/localhost+1.pem'),
}
//Input Sanitization imports
// const mongoSanitize = require('express-mongo-sanitize')
//const xss = require('xss-clean')

// initialize express
const app = express();

// ---------- Global Middlewares ----------

// Parse JSON safely with 20kb limit
app.use(express.json({ limit: '20kb' }));
// calling in express.json middleware, so that our app can handle json
//app.use(express.json());

//Prevents  NoSQL query injection
//app.use(mongoSanitize())

//Prevents site script xss
//app.use(xss())

// Basic security headers (X-Frame, CSP, XSS filters, etc.)
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
        : false, // disables CSP in dev for Vite
    crossOriginEmbedderPolicy: false, // avoids CORS issues with Vite dev
  })
);

// HSTS (HTTP Strict Transport Security) for 1 year
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true,
  })
);

// Force HTTPS in production (redirect HTTP → HTTPS)
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
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

app.use((req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.params) req.params = sanitize(req.params);
  next();
});

// 🔒 Global no-cache policy (best default for financial & auth APIs)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Logger for development
app.use(morgan('dev'));

// Basic rate limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit per IP
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ---------- Routes ----------
app.use('/v1/auth', authRoute);
app.use('/v1/bank', bankRoute);
app.use('/v1/customer', customerRoute);
app.use('/v1/transaction', transactionRoute);

// ---------- Error Handling ----------
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ---------- Start Server ----------
const port = process.env.API_PORT || 3000;

connectToMongo();

// app.listen(port, () => {
//   console.log(`Secure API listening on port ${port}`);
// });
https.createServer(options, app).listen(port, ()=>{
    console.log(`The API is now SECURELY listening on port ${port}`)
})
