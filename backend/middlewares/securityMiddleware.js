// backend/middlewares/securityMiddlewares.js
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
  origin: "https://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // for legacy browsers
};

function securityMiddlewares(app) {
    app.use(cors(corsOptions));
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'default-src': ["'self'"],
                    'frame-ancestors': ["'none'"],
                },
            },
            featurePolicy: {
                features: {
                    geolocation: ["'none'"],
                    microphone: ["'none'"],
                },
            },
            hidePoweredBy: true,
            frameguard: { action: 'deny' },
            ieNoOpen: true,
        })
    );

    
    console.log("✅ Helmet and CORS security middleware applied.");
}

module.exports = {securityMiddlewares};
