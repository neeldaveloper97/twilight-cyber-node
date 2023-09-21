const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  result: {
    type: Array,
    required: true,
  },
  breaches: {
    type: Object,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

// Create the Employee model
const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;