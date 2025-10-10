// backend/middlewares/securityMiddlewares.js
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

function securityMiddlewares(app) {
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

    app.use(cors(corsOptions));
    console.log("✅ Helmet and CORS security middleware applied.");
}

module.exports = securityMiddlewares;
