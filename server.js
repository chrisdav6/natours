require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

const app = require('./app');
const port = process.env.port || 3000;

//Connect to DB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DBPASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DB'));

//Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});