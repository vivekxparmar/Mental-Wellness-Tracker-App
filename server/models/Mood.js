const mongoose = require("mongoose");

// Mood Schema
const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  sentimentScore: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: () => {
      const nowUtc = new Date(Date.now());
      const istOffset = 5.5 * 60 * 60 * 1000;
      return new Date(nowUtc.getTime() + istOffset);
    },
  },
});

module.exports = mongoose.model("Mood", moodSchema);
