// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const journalRoutes = require('./routes/journal');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://mental-wellness-tracker-app.vercel.app', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Methods to allow
  credentials: true,  // Allows cookies to be sent (if needed)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/journal', journalRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Mental Wellness Tracker API is running 🚀');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
