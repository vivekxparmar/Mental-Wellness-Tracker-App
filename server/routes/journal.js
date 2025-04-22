const express = require('express');
const Journal = require('../models/Journal');
const auth = require('../middleware/auth');
const Sentiment = require('sentiment');
const router = express.Router();
const sentiment = new Sentiment();

// Add Journal Entry
router.post('/', auth, async (req, res) => {
  try {
    const { entry } = req.body;
    const score = sentiment.analyze(entry).score;

    const newJournal = new Journal({
      userId: req.user.id,
      entry,
      sentimentScore: score,
    });

    await newJournal.save();
    res.status(201).json(newJournal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Journal History
router.get('/', auth, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
