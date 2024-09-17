const Medicine = require('../models/Medicine');

// Create new medicine (Store Manager only)
exports.createMedicine = async (req, res) => {
  console.log('Creating medicine with data:', req.body); // Log request body
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    console.error('Error creating medicine:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all medicines (accessible by Store Manager and Sales Executive)
exports.getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    console.error('Error fetching medicines:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Update medicine (Store Manager only)
exports.updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' }); // Handle case where medicine is not found
    }
    res.json(medicine);
  } catch (error) {
    console.error('Error updating medicine:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete medicine (Store Manager only)
exports.deleteMedicine = async (req, res) => {
  try {
    const result = await Medicine.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Medicine not found' }); // Handle case where medicine is not found
    }
    res.json({ message: 'Medicine deleted' });
  } catch (error) {
    console.error('Error deleting medicine:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};
