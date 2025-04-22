const express = require("express");
const Mood = require("../models/Mood");
const auth = require("../middleware/auth");
const router = express.Router();

// Mood to Sentiment Map
const moodSentimentMap = {
  Happy: 1,
  Joyful: 1,
  Excited: 1,
  LOL: 0.5,
  Warm: 0.8,
  Peaceful: 0.7,
  Content: 0.6,
  Silly: 0.5,
  Playful: 0.7,
  Loved: 1,
  Affectionate: 0.9,
  Meh: 0,
  Thinking: 0.2,
  Blank: 0,
  Smug: -0.2,
  Unamused: -0.3,
  "Over it": -0.4,
  Awkward: -0.5,
  Down: -0.8,
  Sad: -1,
  Heartbroken: -1,
  Exhausted: -0.7,
  Pleading: -0.6,
  Frustrated: -0.8,
  Furious: -1,
  "Mind-blown": 0.8,
  Scared: -0.9,
  Melting: -0.5,
  Overwhelmed: -0.7,
  Invisible: -0.6,
};

// Helper Functions
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const safeDivision = (sum, count) => {
  return count === 0 ? null : parseFloat((sum / count).toFixed(2));
};

const calculatePeriodAverage = (data, start, end) => {
  const period = data.slice(start, end).filter(val => val !== null);
  if (!period.length) return null;
  const sum = period.reduce((a, b) => a + b, 0);
  return parseFloat((sum / period.length).toFixed(2));
};

// ➕ Add Mood
router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.mood || !moodSentimentMap.hasOwnProperty(req.body.mood)) {
      return res.status(400).json({ message: "Invalid mood value" });
    }

    const sentimentScore = moodSentimentMap[req.body.mood];
    const newMood = new Mood({
      userId: req.user.id,
      mood: req.body.mood,
      sentimentScore,
    });
    
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    console.error("Add mood error:", err);
    res.status(500).json({ 
      message: "Server error",
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
});

// 📅 Today Analytics
router.get("/analytics/today", auth, async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const moods = await Mood.find({
      userId: req.user.id,
      date: { $gte: startOfDay, $lt: endOfDay }
    }).sort({ date: -1 });

    const hourlyData = Array(24).fill(null).map(() => ({ sum: 0, count: 0 }));

    moods.forEach((mood) => {
      const hour = new Date(mood.date).getHours();
      hourlyData[hour].sum += mood.sentimentScore;
      hourlyData[hour].count++;
    });

    const hourlySentiments = hourlyData.map(hour => 
      hour.count > 0 ? parseFloat((hour.sum / hour.count).toFixed(2)) : null
    );

    const dailySentiment = moods.length > 0
      ? parseFloat((
          moods.reduce((sum, mood) => sum + mood.sentimentScore, 0) / moods.length
        ).toFixed(2))
      : null;

    res.json({
      day: formatDate(today),
      currentMood: moods[0] ? {
        mood: moods[0].mood,
        sentimentScore: moods[0].sentimentScore,
        timestamp: moods[0].date
      } : null,
      sentiment: dailySentiment,
      morningSentiment: calculatePeriodAverage(hourlySentiments, 6, 12),
      afternoonSentiment: calculatePeriodAverage(hourlySentiments, 12, 18),
      eveningSentiment: calculatePeriodAverage(hourlySentiments, 18, 24),
      hourlySentiments,
      moodCount: moods.length
    });

  } catch (err) {
    console.error("Today analytics error:", err);
    res.status(500).json({ 
      message: "Server error",
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
});

// 📆 Weekly Analytics
router.get("/analytics/week", auth, async (req, res) => {
  try {
    const now = new Date();
    const weekAgo = new Date(now.setDate(now.getDate() - 6));
    weekAgo.setHours(0, 0, 0, 0);

    // Fetch all mood entries for the past week
    const moods = await Mood.find({
      userId: req.user.id,
      date: { $gte: weekAgo, $lte: new Date() }
    }).sort({ date: 1 });

    // Initialize the result object for all 7 days of the week
    const result = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekAgo);
      date.setDate(date.getDate() + i);
      const dateKey = formatDate(date);
      
      result[dateKey] = {
        date: dateKey,
        weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
        sentiment: null,
        entries: 0,
        hourlySentiments: Array(24).fill(null).map(() => ({ sum: 0, count: 0 }))
      };
    }

    // Process mood entries to fill hourly data and calculate daily sentiment
    moods.forEach(entry => {
      const entryDate = new Date(entry.date);
      const dateKey = formatDate(entryDate);
      const hour = entryDate.getHours();

      if (result[dateKey]) {
        result[dateKey].hourlySentiments[hour].sum += entry.sentimentScore;
        result[dateKey].hourlySentiments[hour].count++;
        result[dateKey].entries++;
      }
    });

    // Calculate average sentiment for each day and hourly averages
    const response = Object.values(result).map(dayData => {
      const hourlyAverages = dayData.hourlySentiments.map(hour => 
        hour.count > 0 ? safeDivision(hour.sum, hour.count) : null
      );

      const validHours = dayData.hourlySentiments.filter(h => h.count > 0);
      const dayAverage = validHours.length
        ? safeDivision(
            validHours.reduce((sum, h) => sum + h.sum, 0),
            validHours.reduce((sum, h) => sum + h.count, 0)
          )
        : null;

      return {
        date: dayData.date,
        weekday: dayData.weekday,
        sentiment: dayAverage,
        entries: dayData.entries,
        morningSentiment: calculatePeriodAverage(hourlyAverages, 6, 12),
        afternoonSentiment: calculatePeriodAverage(hourlyAverages, 12, 18),
        eveningSentiment: calculatePeriodAverage(hourlyAverages, 18, 24),
        hourlySentiments: hourlyAverages
      };
    });

    // Get the most recent mood for the week (current mood)
    const latestMood = moods.length > 0 ? {
      mood: moods[0].mood,
      sentimentScore: moods[0].sentimentScore,
      timestamp: moods[0].date
    } : null;

    // Send the current mood of the week along with the weekly data
    res.json({
      currentMood: latestMood,  // Adding the current mood to the response
      weekData: response         // Week's mood data
    });

  } catch (err) {
    console.error("Weekly analytics error:", err);
    res.status(500).json({ 
      message: "Server error",
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
});


// 📅 Monthly Analytics (optimized)
router.get("/analytics/month", auth, async (req, res) => {
  try {
    const now = new Date();
    const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
    yearAgo.setDate(1);

    const moods = await Mood.find({
      userId: req.user.id,
      date: { $gte: yearAgo, $lte: new Date() }
    }).sort({ date: 1 });

    const monthMap = {};
    // Initialize all months
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      monthMap[key] = {
        month: key,
        year: date.getFullYear(),
        monthName: date.toLocaleDateString("en-US", { month: "short" }),
        sentiment: null,
        entries: 0,
        weeklySentiments: Array(5).fill(null).map(() => ({ sum: 0, count: 0 }))
      };
    }

    // Process mood entries
    moods.forEach(entry => {
      const entryDate = new Date(entry.date);
      const key = `${entryDate.getFullYear()}-${String(entryDate.getMonth() + 1).padStart(2, '0')}`;
      
      const firstDay = new Date(entryDate.getFullYear(), entryDate.getMonth(), 1);
      const weekOfMonth = Math.floor((entryDate.getDate() + firstDay.getDay() - 1) / 7);
      
      if (monthMap[key] && weekOfMonth >= 0 && weekOfMonth < 5) {
        monthMap[key].weeklySentiments[weekOfMonth].sum += entry.sentimentScore;
        monthMap[key].weeklySentiments[weekOfMonth].count++;
        monthMap[key].entries++;
      }
    });

    // Calculate averages
    const response = Object.values(monthMap)
      .map(monthData => {
        const weeklyAverages = monthData.weeklySentiments.map(week => 
          week.count > 0 ? safeDivision(week.sum, week.count) : null
        );

        const validWeeks = monthData.weeklySentiments.filter(w => w.count > 0);
        const monthAverage = validWeeks.length
          ? safeDivision(
              validWeeks.reduce((sum, w) => sum + w.sum, 0),
              validWeeks.reduce((sum, w) => sum + w.count, 0)
            )
          : null;

        return {
          month: monthData.month,
          monthName: monthData.monthName,
          year: monthData.year,
          sentiment: monthAverage,
          entries: monthData.entries,
          weeklySentiments: weeklyAverages,
          firstWeekSentiment: weeklyAverages[0],
          secondWeekSentiment: weeklyAverages[1],
          thirdWeekSentiment: weeklyAverages[2],
          fourthWeekSentiment: weeklyAverages[3],
          fifthWeekSentiment: weeklyAverages[4]
        };
      })
      .sort((a, b) => a.month.localeCompare(b.month));

    res.json(response);
  } catch (err) {
    console.error("Monthly analytics error:", err);
    res.status(500).json({ 
      message: "Server error",
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
});

module.exports = router;