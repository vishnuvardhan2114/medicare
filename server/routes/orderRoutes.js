const express = require('express');
const { createOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

// Sales Executive: Create and View Orders
router.post('/executive', createOrder);
router.get('/executive',  getOrders);

// Update and Delete Orders
router.put('/executive/:id',  updateOrder);
router.delete('/executive/:id', deleteOrder);

module.exports = router;
