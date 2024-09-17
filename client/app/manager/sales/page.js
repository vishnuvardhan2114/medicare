"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, Grid, Modal, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled container for background image
const BackgroundContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  padding: theme.spacing(8),
  margin: 0,
  backgroundImage: 'url("https://unblast.com/wp-content/uploads/2022/07/Pharmacy-Illustration-AI.jpg")',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
}));

// Centered modal style with backdrop filter
const CenteredModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '500px',
  backgroundColor: 'white',
  padding: theme.spacing(3),
  // boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

export default function SalesExecutives() {
  const [executives, setExecutives] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    experienceYears: '',
  });
  const [open, setOpen] = useState(false); // Modal open state

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/manager/sales', {
          headers: {
            'x-auth-token': token,
          }
        });
        setExecutives(data);
      } catch (error) {
        console.error('Error fetching members:', error.response ? error.response.data : error.message);
      }
    };
    fetchExecutives();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post('http://localhost:5000/api/manager/sales', form, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        }
      });
      setExecutives([...executives, data]);
      setOpen(false); // Close modal after successful submission
    } catch (error) {
      console.error('Error adding sales member:', error.response ? error.response.data : error.message);
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
              Sales Executives
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Add New Executive
            </Button>
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
              backgroundColor:  'rgba(180, 205, 250, 0.7)'
            }}
          >
            <Typography variant="h5" mt={4} mb={2}>
              Executive List
            </Typography>
            {executives.length > 0 ? (
              <ul>
                {executives.map((executive) => (
                  <li key={executive._id} className="mb-2 p-2 border rounded-md shadow-sm">
                    <strong>{executive.firstName} {executive.lastName}</strong> - {executive.experienceYears} years experience
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No executives available.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Centered Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <CenteredModal>
          <Typography variant="h6" gutterBottom>
            Add Sales Executive
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              margin="normal"
            />
          <TextField
              label="Gender"
              select
              variant="outlined"
              fullWidth
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }} // Ensure the label is always in position
              slotProps={{
                select: {
                  native: true,
                  style: { padding: '8px 10px' }, // Adjust padding if necessary
                },
              }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
          </TextField>

            <TextField
              label="Years of Experience"
              type="number"
              variant="outlined"
              fullWidth
              value={form.experienceYears}
              onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Sales Executive
            </Button>
          </form>
        </CenteredModal>
      </Modal>
    </BackgroundContainer>
  );
}
