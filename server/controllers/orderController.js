const Order = require('../models/Order');

// Create new order (Sales Executive only)
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const formattedOrders = orders.map(order => ({
      ...order.toObject(),
      products: Array.isArray(order.products) ? order.products : [order.products],
    }));
    res.json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Update an existing order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
