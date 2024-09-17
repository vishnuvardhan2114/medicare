const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const salesExecutiveRoutes = require('./routes/salesExecutiveRoutes');
const productRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();


// Connect to DB
connectDB();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Your client URL
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization,x-auth-token', // Allowed headers
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', medicineRoutes);
app.use('/api', salesExecutiveRoutes);
app.use('/api',productRoutes);
app.use('/api',userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
