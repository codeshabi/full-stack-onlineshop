
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstackonlineshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
