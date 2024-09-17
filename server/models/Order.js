const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerContact: String,
  products: Array,
  totalAmount: Number,
});

module.exports = mongoose.model('Order', orderSchema);
