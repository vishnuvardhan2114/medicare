const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Store Manager', 'Sales Executive'], default: 'Sales Executive' },
});

module.exports = mongoose.model('User', userSchema);
