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
  Modal,
  Box,
  MenuItem,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackgroundContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  width: "100vw",
  padding: theme.spacing(2),
  margin: 0,
  backgroundImage:
    'url("https://unblast.com/wp-content/uploads/2022/07/Pharmacy-Illustration-AI.jpg")',
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
}));

const CenteredModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  backgroundColor: "white",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

export default function SalesExecutives() {
  const [executives, setExecutives] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    experienceYears: "",
    id: "", // For update operations
  });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Fetch sales executives
  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:5000/api/manager/sales",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setExecutives(data);
      } catch (error) {
        console.error(
          "Error fetching members:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchExecutives();
  }, []);

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.experienceYears || form.experienceYears <= 0) {
      newErrors.experienceYears = "Experience should be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      if (editMode) {
        // Update existing executive
        await axios.put(
          `http://localhost:5000/api/manager/sales/${form.id}`,
          form,
          {
            headers: {
              "x-auth-token": token,
              "Content-Type": "application/json",
            },
          }
        );
        setExecutives(
          executives.map((exec) => (exec._id === form.id ? form : exec))
        );
        toast.success("Sales executive updated successfully!");
      } else {
        // Add new executive
        const { data } = await axios.post(
          "http://localhost:5000/api/manager/sales",
          form,
          {
            headers: {
              "x-auth-token": token,
              "Content-Type": "application/json",
            },
          }
        );
        setExecutives([...executives, data]);
        toast.success("Sales executive added successfully!");
      }
      setOpen(false);
      setForm({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        experienceYears: "",
        id: "",
      });
      setEditMode(false);
    } catch (error) {
      toast.error(
        "Error handling sales member: " +
          (error.response ? error.response.data : error.message)
      );
      console.error(
        "Error handling sales member:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Handle firing an executive
  const handleFire = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/manager/sales/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setExecutives(executives.filter((executive) => executive._id !== id));
      toast.success("Sales executive fired successfully!");
    } catch (error) {
      toast.error(
        "Error firing sales member: " +
          (error.response ? error.response.data : error.message)
      );
      console.error(
        "Error firing sales member:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Handle editing an executive
  const handleEdit = (executive) => {
    setForm({
      firstName: executive.firstName,
      lastName: executive.lastName,
      dob: executive.dob,
      gender: executive.gender,
      experienceYears: executive.experienceYears,
      id: executive._id,
    });
    setEditMode(true);
    setOpen(true);
  };

  // Filter executives based on search query
  const filteredExecutives = executives.filter(
    (executive) =>
      executive.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      executive.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BackgroundContainer maxWidth={false}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <IconButton onClick={() => router.push('/')} color="primary">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom textAlign="center">
              Sales Executives
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              {editMode ? "Edit Executive" : "Add New Executive"}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              maxHeight: "400px",
              overflowY: "auto",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h5" mt={4} mb={2}>
              Executive List
            </Typography>
            <TextField
              label="Search Executives"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              margin="normal"
            />
            {filteredExecutives.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {filteredExecutives.map((executive) => (
                  <li
                    key={executive._id}
                    style={{
                      marginBottom: "8px",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <strong>
                        {executive.firstName} {executive.lastName}
                      </strong>{" "}
                      - {executive.experienceYears} years experience
                    </span>
                    <div>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(executive)}
                        style={{ marginRight: "8px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleFire(executive._id)}
                      >
                        Fire
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No executives found.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Modal open={open} onClose={() => setOpen(false)}>
        <CenteredModal>
          <Typography variant="h6" gutterBottom>
            {editMode ? "Edit Sales Executive" : "Add Sales Executive"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName}
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
              error={!!errors.dob}
              helperText={errors.dob}
            />
            <TextField
              label="Gender"
              select
              variant="outlined"
              fullWidth
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              margin="normal"
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              label="Years of Experience"
              type="number"
              variant="outlined"
              fullWidth
              value={form.experienceYears}
              onChange={(e) =>
                setForm({ ...form, experienceYears: e.target.value })
              }
              margin="normal"
              error={!!errors.experienceYears}
              helperText={errors.experienceYears}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {editMode ? "Update Executive" : "Add Sales Executive"}
            </Button>
          </form>
        </CenteredModal>
      </Modal>

      <ToastContainer />
    </BackgroundContainer>
  );
}
