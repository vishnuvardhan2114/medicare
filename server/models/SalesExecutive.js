const mongoose = require('mongoose');
const { Schema } = mongoose;

const SalesExecutiveSchema = new Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  experienceYears: { type: Number, required: true }
});

const SalesExecutive = mongoose.model('SalesExecutive', SalesExecutiveSchema);

module.exports = SalesExecutive;
