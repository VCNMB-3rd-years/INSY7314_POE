// server/server.js
const https = require("https");
const fs = require("fs");
const { connectToMongo } = require("./services/dbService.js");
const app = require("./app.js");

const port = process.env.API_PORT || 3000;

const options = {
  key: fs.readFileSync("./certs/localhost+1-key.pem"),
  cert: fs.readFileSync("./certs/localhost+1.pem"),
};

connectToMongo()
  .then(() => {
    https.createServer(options, app).listen(port, () => {
      console.log(`✅ Secure API running on https://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
