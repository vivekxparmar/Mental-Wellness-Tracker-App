import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  TimeSeriesScale,
  Decimation,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { FiActivity, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { FaRegSmile, FaRegMeh, FaRegFrown } from "react-icons/fa";
import { RiLoader4Line } from "react-icons/ri";
const API = import.meta.env.REACT_APP_API_BASE_URL;

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  TimeSeriesScale,
  Decimation
);

const MoodChart = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState("week");
  const [chartData, setChartData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const chartRef = useRef(null);
  const animationRef = useRef(null);

  // Color schemes for different time periods
  const colorSchemes = {
    today: {
      bg: "rgba(52, 211, 153, 0.1)",
      border: "#34D399",
      point: "#059669",
      gradient: ["#34D399", "#10B981"],
    },
    week: {
      bg: "rgba(99, 102, 241, 0.1)",
      border: "#6366F1",
      point: "#4F46E5",
      gradient: ["#6366F1", "#8B5CF6"],
    },
    month: {
      bg: "rgba(244, 114, 182, 0.1)",
      border: "#F472B6",
      point: "#DB2777",
      gradient: ["#F472B6", "#EC4899"],
    },
  };

  // Enhanced data fetching with animation phases
  const fetchData = async () => {
    setLoading(true);
    setAnimationPhase(0);

    try {
      let res;
      let labels = [];
      let data = [];
      let timeData = [];
      let newStats = {};

      if (activeTab === "today") {
        res = await axios.get(`${API}/api/mood/analytics/today`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const raw = res.data;

        data = [
          raw.morningSentiment ?? null,
          raw.afternoonSentiment ?? null,
          raw.eveningSentiment ?? null,
        ];

        labels = ["🌅 Morning", "☀️ Afternoon", "🌙 Evening"];
        timeData = data.map((_, i) => new Date().setHours(6 + i * 6, 0, 0, 0));

        const valid = data.filter((d) => typeof d === "number");

        newStats = {
          current: data[2], // 🌙 Evening
          average:
            valid.length > 0
              ? valid.reduce((a, b) => a + b, 0) / valid.length
              : null,
          trend:
            typeof data[2] === "number" && typeof data[0] === "number"
              ? data[2] - data[0]
              : null,
        };
      } if (activeTab === "week") {
        res = await axios.get(`${API}/api/mood/analytics/week`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      
        // Extracting current mood for the week from the response
        const { currentMood, weekData } = res.data;
      
        // Handle current mood for the week
        if (currentMood) {
          console.log(`Current mood of the week: ${currentMood.mood} with sentiment score: ${currentMood.sentimentScore}`);
        }
      
        // Extract the labels, data, and timeData for the chart
        labels = weekData.map((d) => d.weekday);
        data = weekData.map((d) => d.sentiment);
        timeData = weekData.map((d) => new Date(d.date).getTime());
      
        // Calculate new stats for the week
        const validData = data.filter(
          (v) => typeof v === "number" && !isNaN(v)
        );
      
        newStats = {
          current: data[data.length - 1],
          average:
            validData.length > 0
              ? validData.reduce((a, b) => a + b, 0) / validData.length
              : null,
          trend: data[data.length - 1] - data[0],
        };
      }
       else if (activeTab === "month") {
        res = await axios.get(`${API}/api/mood/analytics/month`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        labels = res.data.map(
          (d) => `${d.monthName} '${String(d.year).slice(2)}`
        );
        data = res.data.map((d) => d.sentiment);
        timeData = res.data.map((d) =>
          new Date(
            d.year,
            d.monthName === "Jan"
              ? 0
              : d.monthName === "Feb"
              ? 1
              : d.monthName === "Mar"
              ? 2
              : d.monthName === "Apr"
              ? 3
              : d.monthName === "May"
              ? 4
              : d.monthName === "Jun"
              ? 5
              : d.monthName === "Jul"
              ? 6
              : d.monthName === "Aug"
              ? 7
              : d.monthName === "Sep"
              ? 8
              : d.monthName === "Oct"
              ? 9
              : d.monthName === "Nov"
              ? 10
              : 11,
            15
          ).getTime()
        );

        const validData = data.filter((v) => v !== null);
        newStats = {
          current: data[data.length - 1],
          average: validData.reduce((a, b) => a + b, 0) / validData.length,
          trend: data[data.length - 1] - data[0],
        };
      }

      setStats(newStats);
      setChartData({
        labels,
        datasets: [
          {
            label: "Mood Score",
            data,
            timeData,
            fill: true,
            backgroundColor: colorSchemes[activeTab].bg,
            borderColor: colorSchemes[activeTab].border,
            borderWidth: 4,
            pointBackgroundColor: colorSchemes[activeTab].point,
            pointRadius: 6,
            pointHoverRadius: 10,
            pointBorderWidth: 2,
            pointBorderColor: "#fff",
            tension: 0.4,
            segment: {
              borderColor: (ctx) =>
                ctx.p0.parsed.y > ctx.p1.parsed.y ? "#EF4444" : "#10B981",
              borderDash: (ctx) =>
                ctx.p0.parsed.y > ctx.p1.parsed.y ? [6, 6] : undefined,
            },
          },
        ],
      });

      // Start animation sequence
      setAnimationPhase(1);
      animationRef.current = setTimeout(() => setAnimationPhase(2), 800);
    } catch (err) {
      console.error("Error fetching mood data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => clearTimeout(animationRef.current);
  }, [activeTab, token]);

  // Animation effects
  useEffect(() => {
    if (chartRef.current && chartData) {
      const chart = chartRef.current;

      if (animationPhase === 1) {
        // Initial draw animation
        chart.options.animation = {
          duration: 1500,
          easing: "easeOutQuart",
        };
        chart.update();
      } else if (animationPhase === 2) {
        // Secondary animation (points and fill)
        chart.options.animation = {
          duration: 800,
          easing: "easeOutBack",
        };
        chart.update();
      }
    }
  }, [animationPhase, chartData]);

  const getMoodIcon = (score) => {
    if (score === null || score === undefined) return null;
    if (score > 0.3) return <FaRegSmile className="text-green-500" />;
    if (score < -0.3) return <FaRegFrown className="text-red-500" />;
    return <FaRegMeh className="text-yellow-500" />;
  };

  const getTrendIcon = (trend) => {
    if (trend === null || trend === undefined)
      return <FiActivity className="text-gray-500" />;
    if (trend > 0) return <FiTrendingUp className="text-green-500" />;
    if (trend < 0) return <FiTrendingDown className="text-red-500" />;
    return <FiActivity className="text-gray-500" />;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, // Controlled manually via animationPhase
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        titleFont: {
          size: 16,
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            let mood = "Neutral";
            if (value > 0.3) mood = "Positive";
            if (value < -0.3) mood = "Negative";
            return `${mood}: ${value.toFixed(2)}`;
          },
          title: (context) => {
            return activeTab === "today"
              ? context[0].label.replace(/[^a-zA-Z]/g, "")
              : context[0].label;
          },
        },
      },
      decimation: {
        enabled: true,
        algorithm: "min-max",
      },
    },
    scales: {
      y: {
        min: -1,
        max: 1,
        ticks: {
          callback: (value) => {
            if (value === 1) return "😊 Very Positive";
            if (value === 0) return "😐 Neutral";
            if (value === -1) return "😞 Very Negative";
            return "";
          },
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawTicks: false,
        },
      },
      x: {
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 12,
        hoverBorderWidth: 3,
      },
      line: {
        borderCapStyle: "round",
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 to-purple-100/90 p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-200/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mood Analytics
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualize your emotional patterns with interactive insights
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-white/30">
            {["today", "week", "month"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? `bg-gradient-to-r ${
                        tab === "today"
                          ? "from-green-500 to-green-600"
                          : tab === "week"
                          ? "from-indigo-500 to-indigo-600"
                          : "from-pink-500 to-pink-600"
                      } text-white shadow-md`
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Current Mood
                </h3>
                {getMoodIcon(stats.current)}
              </div>
              <p className="text-2xl font-bold">
                {stats.current !== null
                  ? Number(stats.current).toFixed(2)
                  : "--"}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Average</h3>
                {getMoodIcon(stats.average)}
              </div>
              <p className="text-2xl font-bold">
                {stats.average !== null ? stats.average.toFixed(2) : "--"}
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Trend</h3>
                {getTrendIcon(stats.trend)}
              </div>
              <p className="text-2xl font-bold">
                {stats.trend !== null
                  ? (stats.trend > 0 ? "+" : "") + stats.trend.toFixed(2)
                  : "--"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Chart Container */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 mb-8 h-[400px] relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <RiLoader4Line className="text-4xl text-indigo-500" />
              </motion.div>
            </div>
          ) : chartData ? (
            <>
              <Line ref={chartRef} data={chartData} options={chartOptions} />
              {/* Interactive elements overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                {/* <button
                  className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 shadow-sm hover:bg-gray-50 transition"
                  onClick={() => chartRef.current.resetZoom()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    ></path>
                  </svg>
                </button> */}
                <button
                  className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 shadow-sm hover:bg-gray-50 transition"
                  onClick={() => fetchData()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              No data available for this period
            </div>
          )}
        </motion.div>

        {/* Insights */}
        {stats && (
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiActivity className="text-indigo-500" /> Your Mood Insights
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                {stats.trend === null
                  ? "Not enough data to determine trend"
                  : stats.trend > 0.2
                  ? "Your mood is trending positively! Keep engaging in activities that bring you joy."
                  : stats.trend < -0.2
                  ? "You've been feeling down recently. Consider reaching out to friends or trying relaxing activities."
                  : "Your mood has been relatively stable. Small positive changes can help elevate your wellbeing."}
              </p>
              <p className="text-gray-700">
                {stats.average === null
                  ? "Not enough data to calculate average"
                  : stats.average > 0.3
                  ? "Your average mood is positive. Reflect on what's been working well for you."
                  : stats.average < -0.3
                  ? "Your average mood has been low. You might benefit from additional support or self-care."
                  : "Your average mood is neutral. Small daily improvements can make a big difference over time."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MoodChart;
