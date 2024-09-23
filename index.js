const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ticketRoutes = require('./routes/ticketRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected successfully");
  } catch (err) {
    console.log("DB CONNECTION ISSUES");
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

// Call the database connection function
connectDB();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Ticket Management API');
});

// Use ticket routes
app.use('/api', ticketRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`APP IS LISTENING AT ${PORT}`);
});
