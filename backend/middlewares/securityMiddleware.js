// middlewares/securityMiddleware.js
const helmet = require('helmet');
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',   // Vite default
  'http://localhost:3000',   // React dev server alternate
  'https://localhost:5173',  // in case using https
  'https://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked from origin: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const securityMiddlewares = (app) => {
  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'frame-ancestors': ["'none'"],
      },
    },
    hidePoweredBy: true,
    frameguard: { action: 'deny' },
    ieNoOpen: true,
  }));

  app.use(cors(corsOptions)); // Correct CORS setup

  console.log(" Helmet and CORS security middleware applied.");
};

module.exports = securityMiddlewares;
