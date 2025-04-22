import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FaSmile, FaPen, FaChartLine, FaLeaf, FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState('day');

  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour > 6 && hour < 18 ? 'day' : 'night');
  }, []);

  const greetingEmoji = timeOfDay === 'day' ? '☀️' : '🌙';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 to-purple-100/90 p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        
        {/* Floating gradient blobs */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-400/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      <header className="text-center mb-14 relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Good {timeOfDay === 'day' ? 'Morning' : 'Evening'}, {user?.username || 'Friend'} {greetingEmoji}
        </motion.h1>
        <motion.p 
          className="text-gray-600 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Track. Reflect. Grow. <FaLeaf className="inline text-green-500" />
        </motion.p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Mood Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white/90 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-400/20 to-blue-400/20 rounded-bl-3xl"></div>
          
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaSmile className="text-5xl text-purple-500 mb-5 drop-shadow-md" />
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Track Your Mood</h2>
          <p className="text-gray-600 mb-5">
            Log your emotional state with our intuitive mood tracker and identify patterns.
          </p>
          <Link
            to="/mood"
            className="inline-flex items-center text-indigo-600 font-normal group hover:underline transition"
          >
            Mood Tracker
            <motion.span 
              className="ml-2 inline-block group-hover:translate-x-1 transition-transform"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2,
                delay: 1
              }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Journal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white/90 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-400/20 to-rose-400/20 rounded-bl-3xl"></div>
          
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaPen className="text-5xl text-pink-500 mb-5 drop-shadow-md" />
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Reflective Journal</h2>
          <p className="text-gray-600 mb-5">
            Express yourself with AI-powered sentiment analysis and writing prompts.
          </p>
          <Link
            to="/journal"
            className="inline-flex items-center text-indigo-600 font-normal group hover:underline transition"
          >
            Start Writing
            <motion.span 
              className="ml-2 inline-block group-hover:translate-x-1 transition-transform"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2,
                delay: 1.2
              }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white/90 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-teal-400/20 to-emerald-400/20 rounded-bl-3xl"></div>
          
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaChartLine className="text-5xl text-teal-500 mb-5 drop-shadow-md" />
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Mood Insights</h2>
          <p className="text-gray-600 mb-5">
            Visualize your emotional patterns with beautiful, interactive charts.
          </p>
          <Link
            to="/analytics"
            className="inline-flex items-center text-indigo-600 font-normal group hover:underline transition"
          >
            View Analytics
            <motion.span 
              className="ml-2 inline-block group-hover:translate-x-1 transition-transform"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2,
                delay: 1.4
              }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </main>

      {/* Daily affirmation */}
      <motion.div 
        className="max-w-md mx-auto mt-16 p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-2xl mb-2">
          {timeOfDay === 'day' ? <FaSun className="inline text-yellow-500" /> : <FaMoon className="inline text-indigo-500" />}
        </div>
        <p className="text-gray-700 italic">
          "Today I choose peace over perfection."
        </p>
        <button className="mt-4 text-sm text-indigo-600 hover:underline">
          Change Affirmation
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;