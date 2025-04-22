const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const journalRoutes = require('./routes/journal');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://mental-wellness-tracker-app.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/journal', journalRoutes);

// Dev route for quick check
if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.send('Mental Wellness Tracker API is running 🚀');
  });
}

// Serve Vite frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'client', 'dist');
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

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
