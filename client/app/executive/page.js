"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from 'next/navigation';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const BackgroundContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(12, 0),
  margin: 0,
  backgroundImage:
    'url("https://www.shutterstock.com/image-illustration/cartoon-doctor-character-male-medic-600nw-2226608319.jpg")',
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
}));

const OrderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const CenteredModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "500px",
  backgroundColor: "white",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

export default function Orders() {
  const router = useRouter(); // Add useRouter hook
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    customerContact: "",
    products: "",
    totalAmount: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [filteredOrders, setFilteredOrders] = useState([]); // Filtered orders based on search
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/executive`);
        console.log('Fetched Orders:', data); // Log the data to check its structure
        setOrders(data);
        setFilteredOrders(data); // Initialize filtered orders
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);
    const filtered = orders.filter(
      (order) =>
        order.customerName.toLowerCase().includes(search) ||
        order.customerContact.toLowerCase().includes(search) ||
        (order.products && order.products.some((product) => product.toLowerCase().includes(search)))
    );
    setFilteredOrders(filtered);
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!form.customerName) newErrors.customerName = "Customer Name is required";
    if (!form.customerContact) newErrors.customerContact = "Customer Contact is required";
    if (!form.products) newErrors.products = "Products are required";
    if (!form.totalAmount || form.totalAmount <= 0) newErrors.totalAmount = "Total Amount must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create or Update Order
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const productsArray = form.products.split(',').map(item => item.trim());
      const orderData = { ...form, products: productsArray };

      if (editMode) {
        // Update order
        await axios.put(`${backendUrl}/api/executive/${currentOrderId}`, orderData);
        const updatedOrders = orders.map((order) =>
          order._id === currentOrderId ? { ...order, ...orderData } : order
        );
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        toast.success("Order updated successfully!");
      } else {
        // Create new order
        const { data } = await axios.post(`${backendUrl}/api/executive`, orderData);
        setOrders([...orders, data]);
        setFilteredOrders([...orders, data]);
        toast.success("Order created successfully!");
      }
      setForm({
        customerName: "",
        customerContact: "",
        products: "",
        totalAmount: "",
      });
      setEditMode(false);
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating/updating order:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/executive/${id}`);
      const updatedOrders = orders.filter((order) => order._id !== id);
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Open modal for create or edit
  const openModal = (order = null) => {
    if (order) {
      setForm({
        customerName: order.customerName,
        customerContact: order.customerContact,
        products: order.products.join(", "),
        totalAmount: order.totalAmount,
      });
      setCurrentOrderId(order._id);
      setEditMode(true);
    } else {
      setForm({
        customerName: "",
        customerContact: "",
        products: "",
        totalAmount: "",
      });
      setEditMode(false);
    }
    setModalOpen(true);
  };

  // Ensure products is an array before joining
  const getProductsString = (products) => {
    return Array.isArray(products) ? products.join(', ') : 'No products';
  };

  return (
    <BackgroundContainer maxWidth={false}>
      <StyledContainer maxWidth="md">
        <Box display="flex" alignItems="center" mb={4}>
          <IconButton onClick={() => router.push('/')} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" gutterBottom ml={2}>
            Create and View Orders
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Customer Name"
                  variant="outlined"
                  fullWidth
                  value={form.customerName}
                  onChange={(e) =>
                    setForm({ ...form, customerName: e.target.value })
                  }
                  margin="normal"
                  error={Boolean(errors.customerName)}
                  helperText={errors.customerName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Customer Contact"
                  variant="outlined"
                  fullWidth
                  value={form.customerContact}
                  onChange={(e) =>
                    setForm({ ...form, customerContact: e.target.value })
                  }
                  margin="normal"
                  error={Boolean(errors.customerContact)}
                  helperText={errors.customerContact}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Products"
                  variant="outlined"
                  fullWidth
                  value={form.products}
                  onChange={(e) =>
                    setForm({ ...form, products: e.target.value })
                  }
                  margin="normal"
                  error={Boolean(errors.products)}
                  helperText={errors.products}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Total Amount"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={form.totalAmount}
                  onChange={(e) =>
                    setForm({ ...form, totalAmount: e.target.value })
                  }
                  margin="normal"
                  error={Boolean(errors.totalAmount)}
                  helperText={errors.totalAmount}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {editMode ? "Update Order" : "Create Order"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <TextField
          label="Search Orders"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          margin="normal"
        />

        <Typography variant="h5" gutterBottom>
          Order List
        </Typography>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order._id}>
              <CardContent>
                <Typography variant="h6">
                  Customer: {order.customerName}
                </Typography>
                <Typography variant="body1">
                  Contact: {order.customerContact}
                </Typography>
                <Typography variant="body1">
                  Products: {getProductsString(order.products)}
                </Typography>
                <Typography variant="body1">
                  Total Amount: ${order.totalAmount}
                </Typography>
                <Box mt={2}>
                  <IconButton onClick={() => openModal(order)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(order._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </OrderCard>
          ))
        ) : (
          <Typography>No orders found</Typography>
        )}

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <CenteredModal>
            <Typography id="modal-title" variant="h6" component="h2">
              {editMode ? "Edit Order" : "Create Order"}
            </Typography>
            <Box mt={2}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Customer Name"
                      variant="outlined"
                      fullWidth
                      value={form.customerName}
                      onChange={(e) =>
                        setForm({ ...form, customerName: e.target.value })
                      }
                      margin="normal"
                      error={Boolean(errors.customerName)}
                      helperText={errors.customerName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Customer Contact"
                      variant="outlined"
                      fullWidth
                      value={form.customerContact}
                      onChange={(e) =>
                        setForm({ ...form, customerContact: e.target.value })
                      }
                      margin="normal"
                      error={Boolean(errors.customerContact)}
                      helperText={errors.customerContact}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Products"
                      variant="outlined"
                      fullWidth
                      value={form.products}
                      onChange={(e) =>
                        setForm({ ...form, products: e.target.value })
                      }
                      margin="normal"
                      error={Boolean(errors.products)}
                      helperText={errors.products}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Total Amount"
                      type="number"
                      variant="outlined"
                      fullWidth
                      value={form.totalAmount}
                      onChange={(e) =>
                        setForm({ ...form, totalAmount: e.target.value })
                      }
                      margin="normal"
                      error={Boolean(errors.totalAmount)}
                      helperText={errors.totalAmount}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      {editMode ? "Update Order" : "Create Order"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CenteredModal>
        </Modal>
      </StyledContainer>
      <ToastContainer />
    </BackgroundContainer>
  );
}
