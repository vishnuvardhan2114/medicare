const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();
const auth = require('../middleware/auth');

// Sales Executive: Create and View Orders
router.post('/executive', createOrder);
router.get('/executive',  getOrders);

module.exports = router;
