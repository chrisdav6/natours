require('dotenv').config({ path: './config.env' });
const app = require('./app');
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});