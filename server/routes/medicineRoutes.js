const express = require('express');
const { createMedicine, getMedicines, updateMedicine, deleteMedicine } = require('../controllers/medicineController');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to protect routes

// Store Manager: Create, Read, Update, Delete Medicines
router.post('/manager', auth(['Store Manager']), createMedicine); // Create a new medicine
router.get('/manager', getMedicines); // Get all medicines
router.put('/manager/:id', auth(['Store Manager']), updateMedicine); // Update a medicine by ID
router.delete('/manager/:id', auth(['Store Manager']), deleteMedicine); // Delete a medicine by ID

module.exports = router;
