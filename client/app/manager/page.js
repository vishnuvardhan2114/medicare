"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';

// Styled container to handle full-width background image
const BackgroundContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw', // Ensure full viewport width
  padding: theme.spacing(12, 0),
  margin: 0, // Remove default margin
  backgroundImage: 'url("https://images.ctfassets.net/70w6ftfzv4je/4BS3lTxYv5a3IrvyPZRdtm/dfcc4b7ed346d72408f7d0e39d2a84e1/Four_Ways_Pharmacies_Can_Benefit_from_Central_Fill_as_a_Service_.jpeg")',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
}));

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    name: '',
    manufacturer: '',
    price: '',
    stock: '',
    discount: '',
  });

  // Fetch Medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/manager');
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };
    fetchMedicines();
  }, []);

  // Add New Medicine
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log(">>>>>>>>>>>>>>>>>>>>>",token) // Retrieve token from local storage
      const { data } = await axios.post('http://localhost:5000/api/manager', form, {
        headers: {
          'x-auth-token': token, // Send token in header
          'Content-Type': 'application/json', // Ensure content type is set
        }
      });
      console.log(data);
      setMedicines([...medicines, data]);
    } catch (error) {
      console.error('Error adding medicine:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <BackgroundContainer maxWidth={false}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" gutterBottom textAlign="center">
              Manage Medicines
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Manufacturer"
                    variant="outlined"
                    fullWidth
                    value={form.manufacturer}
                    onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Price"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Stock"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Discount"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add Medicine
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              maxHeight: '400px',
              overflowY: 'auto',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h5" mt={4} mb={2}>
              Medicine List
            </Typography>
            {medicines.length > 0 ? (
              <ul>
                {medicines.map((medicine) => (
                  <li key={medicine._id} className="mb-2 p-2 border rounded-md shadow-sm">
                    <strong>{medicine.name}</strong> - {medicine.manufacturer}, Price: ${medicine.price}, Stock: {medicine.stock}, Discount: {medicine.discount}%
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No medicines available.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </BackgroundContainer>
  );
}
