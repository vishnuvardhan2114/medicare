const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  manufacturer: String,
  price: Number,
  stock: Number,
  discount: Number,
});

module.exports = mongoose.model('Medicine', medicineSchema);
