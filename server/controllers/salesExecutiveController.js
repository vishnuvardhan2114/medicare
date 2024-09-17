const SalesExecutive = require('../models/SalesExecutive');

// Create new sales executive (Store Manager only)
exports.createExecutive = async (req, res) => {
  console.log('Creating members with data:', req.body); // Log request body
  try {
    const executive = new SalesExecutive(req.body);
    await executive.save();
    res.status(201).json(executive);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all sales executives (Store Manager only)
exports.getExecutives = async (req, res) => {
  try {
    const executives = await SalesExecutive.find();
    res.json(executives);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update sales executive (Store Manager only)
exports.updateExecutive = async (req, res) => {
  try {
    const executive = await SalesExecutive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(executive);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete sales executive (Store Manager only)
exports.deleteExecutive = async (req, res) => {
  try {
    await SalesExecutive.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sales Executive deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
