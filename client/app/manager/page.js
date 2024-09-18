"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
import { useRouter } from 'next/navigation';

// Styled container with background
const BackgroundContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  width: "100%",
  padding: theme.spacing(4, 0),
  margin: 0,
  backgroundImage:
    'url("https://images.ctfassets.net/70w6ftfzv4je/4BS3lTxYv5a3IrvyPZRdtm/dfcc4b7ed346d72408f7d0e39d2a84e1/Four_Ways_Pharmacies_Can_Benefit_from_Central_Fill_as_a_Service_.jpeg")',
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
}));

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [form, setForm] = useState({
    name: "",
    manufacturer: "",
    price: "",
    stock: "",
    discount: "",
    id: "", // For update operations
  });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter(); // Initialize useRouter

  // Fetch medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axios.get("https://localhost:5000/api/manager");
        setMedicines(data);
        setFilteredMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        toast.error("Failed to fetch medicines.");
      }
    };
    fetchMedicines();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.manufacturer) newErrors.manufacturer = "Manufacturer is required";
    if (!form.price || form.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!form.stock || form.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (!form.discount || form.discount < 0 || form.discount > 100) newErrors.discount = "Discount must be between 0 and 100";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const token = localStorage.getItem("token");
      if (isEditing) {
        // Update medicine
        await axios.put(`https://localhost:5000/api/manager/${form.id}`, form, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        });
        setMedicines(medicines.map((med) => (med._id === form.id ? form : med)));
        setFilteredMedicines(filteredMedicines.map((med) => (med._id === form.id ? form : med)));
        toast.success("Medicine updated successfully!");
      } else {
        // Add new medicine
        const { data } = await axios.post("https://localhost:5000/api/manager", form, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        });
        setMedicines([...medicines, data]);
        setFilteredMedicines([...filteredMedicines, data]);
        toast.success("Medicine added successfully!");
      }
      setForm({
        name: "",
        manufacturer: "",
        price: "",
        stock: "",
        discount: "",
        id: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error handling medicine:", error.response ? error.response.data : error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    const filtered = medicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(searchTerm) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm)
    );
    setFilteredMedicines(filtered);
  };

  // Handle edit
  const handleEdit = (medicine) => {
    setForm({
      name: medicine.name,
      manufacturer: medicine.manufacturer,
      price: medicine.price,
      stock: medicine.stock,
      discount: medicine.discount,
      id: medicine._id,
    });
    setIsEditing(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:5000/api/manager/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setMedicines(medicines.filter((med) => med._id !== id));
      setFilteredMedicines(filteredMedicines.filter((med) => med._id !== id));
      toast.success("Medicine removed successfully!");
    } catch (error) {
      console.error("Error removing medicine:", error.response ? error.response.data : error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <BackgroundContainer maxWidth={false}>
      <IconButton
        onClick={() => router.push('/')} // Navigate to home page
        sx={{ position: 'absolute', top: 16, left: 16, color: 'white' }}
      >
        <ArrowBack />
      </IconButton>

      <Grid container spacing={2} sx={{ pt: 8 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
                    error={Boolean(errors.name)}
                    helperText={errors.name}
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
                    error={Boolean(errors.manufacturer)}
                    helperText={errors.manufacturer}
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
                    error={Boolean(errors.price)}
                    helperText={errors.price}
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
                    error={Boolean(errors.stock)}
                    helperText={errors.stock}
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
                    error={Boolean(errors.discount)}
                    helperText={errors.discount}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {isEditing ? "Update Medicine" : "Add Medicine"}
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
              maxHeight: "calc(100vh - 200px)",
              overflowY: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" mt={4} mb={2}>
              Medicine List
            </Typography>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={search}
              onChange={handleSearch}
              margin="normal"
              sx={{ mb: 2 }}
            />
            {filteredMedicines.length > 0 ? (
              <ul>
                {filteredMedicines.map((medicine) => (
                  <li
                    key={medicine._id}
                    className="mb-2 p-2 border rounded-md shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <strong>{medicine.name}</strong> - {medicine.manufacturer}
                      , Price: ${medicine.price}, Stock: {medicine.stock},
                      Discount: {medicine.discount}%
                    </div>
                    <div>
                      <IconButton aria-label="edit" onClick={() => handleEdit(medicine)}>
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete(medicine._id)}>
                        <Delete />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No medicines available.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <ToastContainer />
    </BackgroundContainer>
  );
}
