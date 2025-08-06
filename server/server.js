const express = require('express');
const cors = require('cors');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route handlers
const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/applications');
const opexRoutes = require('./routes/opex');

// Routes
app.use('/api/v1/app', authRoutes);
app.use('/api/v1/app', appRoutes);
app.use('/api/v1/app', opexRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 