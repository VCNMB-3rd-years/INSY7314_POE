// calling in all required imports
const express = require('express');
require('dotenv').config();
const { connectToMongo } = require('./services/dbService.js');
const { securityMiddlewares } = require('./middlewares/securityMiddleware.js');

// call in our router
const authRoute = require('./routes/authRoute.js')
const bankRoute = require('./routes/bankRoute.js');
const customerRoute = require('./routes/customerRoute.js');
const transactionRoute = require('./routes/transactionRoute.js');

// setting up express using the default parameters
const app = express();

// calling in express.json middleware, so that our app can handle json
app.use(express.json());

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

app.use('/v1/auth', authRoute);
app.use('/v1/bank', bankRoute);
app.use('/v1/customer', customerRoute);
app.use('/v1/transaction', transactionRoute);

const port = process.env.API_PORT || 3000;

// call the method from our dbService file to connect to our Mongo database
connectToMongo();

// tell the API to start listening on a port we provide (which will eventually move to a .env file)
app.listen(port, () => {
    console.log(`The API is now listening on port ${port}.`)
});