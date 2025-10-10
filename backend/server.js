const { connectToMongo } = require('./services/dbService.js');
const app = require('./app.js');

const port = process.env.API_PORT || 3000;

connectToMongo().then(() => {
  app.listen(port, () => console.log(`✅ Secure API listening on port ${port}`));
});
