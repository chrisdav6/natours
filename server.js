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

//Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name!'],
    unique: true
  },
  rating: {
    type: Number,
    defualt: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price!']
  }
});

//Model
const Tour = mongoose.model('Tour', tourSchema);

//Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});