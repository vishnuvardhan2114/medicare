"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

// Styled container for the page
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));
const BackgroundContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  // width: '100vw', // Ensure full viewport width
  padding: theme.spacing(12, 0),
  margin: 0, // Remove default margin
  backgroundImage: 'url("https://www.shutterstock.com/image-illustration/cartoon-doctor-character-male-medic-600nw-2226608319.jpg")',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
}));

// Styled card for orders
const OrderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    customerName: '',
    customerContact: '',
    products: '',
    totalAmount: '',
  });

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/executive');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Create New Order
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/executive', form);
      setOrders([...orders, data]);
      setForm({
        customerName: '',
        customerContact: '',
        products: '',
        totalAmount: '',
      }); // Clear form after submission
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <BackgroundContainer maxWidth={false}>
    <StyledContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create and View Orders
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer Name"
                variant="outlined"
                fullWidth
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer Contact"
                variant="outlined"
                fullWidth
                value={form.customerContact}
                onChange={(e) => setForm({ ...form, customerContact: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Products"
                variant="outlined"
                fullWidth
                value={form.products}
                onChange={(e) => setForm({ ...form, products: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Total Amount"
                type="number"
                variant="outlined"
                fullWidth
                value={form.totalAmount}
                onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Order
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Order List
      </Typography>
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <CardContent>
              <Typography variant="h6">Customer: {order.customerName}</Typography>
              <Typography variant="body1">Contact: {order.customerContact}</Typography>
              <Typography variant="body1">Products: {order.products.join(', ')}</Typography>
              <Typography variant="body1">Total Amount: ${order.totalAmount}</Typography>
            </CardContent>
          </OrderCard>
        ))
      ) : (
        <Typography>No orders available.</Typography>
      )}
    </StyledContainer>
    </BackgroundContainer>
  );
}
