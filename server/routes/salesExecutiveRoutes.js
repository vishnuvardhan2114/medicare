const express = require('express');
const { createExecutive, getExecutives, updateExecutive, deleteExecutive } = require('../controllers/salesExecutiveController');
const router = express.Router();
const auth = require('../middleware/auth');

// Store Manager: Create, Read, Update, Delete Sales Executives
router.post('/manager/sales', createExecutive);
router.get('/manager/sales', getExecutives);
router.put('/manager/sales/:id', auth(['Store Manager']), updateExecutive);
router.delete('/manager/sales/:id', auth(['Store Manager']), deleteExecutive);

module.exports = router;
