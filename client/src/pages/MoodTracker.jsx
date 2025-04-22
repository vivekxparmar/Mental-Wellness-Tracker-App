import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import {toast} from "react-hot-toast";
import axios from 'axios';
const API = process.env.REACT_APP_API_BASE_URL;

const moods = [
  { emoji: "😀", label: "Happy", color: "from-yellow-300 to-yellow-400" },
  { emoji: "😄", label: "Joyful", color: "from-amber-300 to-amber-400" },
  { emoji: "😁", label: "Excited", color: "from-orange-300 to-orange-400" },
  { emoji: "😂", label: "LOL", color: "from-pink-300 to-pink-400" },
  { emoji: "😊", label: "Warm", color: "from-emerald-300 to-emerald-400" },
  { emoji: "😇", label: "Peaceful", color: "from-teal-300 to-teal-400" },
  { emoji: "🙂", label: "Content", color: "from-lime-300 to-lime-400" },
  { emoji: "🙃", label: "Silly", color: "from-green-300 to-green-400" },
  { emoji: "😉", label: "Playful", color: "from-blue-300 to-blue-400" },
  { emoji: "🥰", label: "Loved", color: "from-rose-300 to-rose-400" },
  { emoji: "😗", label: "Affectionate", color: "from-rose-200 to-rose-300" },
  { emoji: "😐", label: "Meh", color: "from-gray-300 to-gray-400" },
  { emoji: "🤔", label: "Thinking", color: "from-zinc-300 to-zinc-400" },
  { emoji: "😶", label: "Blank", color: "from-slate-300 to-slate-400" },
  { emoji: "😏", label: "Smug", color: "from-fuchsia-300 to-fuchsia-400" },
  { emoji: "😒", label: "Unamused", color: "from-indigo-300 to-indigo-400" },
  { emoji: "🙄", label: "Over it", color: "from-violet-300 to-violet-400" },
  { emoji: "😬", label: "Awkward", color: "from-cyan-300 to-cyan-400" },
  { emoji: "😔", label: "Down", color: "from-blue-300 to-blue-400" },
  { emoji: "😢", label: "Sad", color: "from-purple-300 to-purple-400" },
  { emoji: "😭", label: "Heartbroken", color: "from-purple-400 to-purple-500" },
  { emoji: "😩", label: "Exhausted", color: "from-sky-300 to-sky-400" },
  { emoji: "🥺", label: "Pleading", color: "from-indigo-200 to-indigo-300" },
  { emoji: "😤", label: "Frustrated", color: "from-red-300 to-red-400" },
  { emoji: "😡", label: "Furious", color: "from-rose-400 to-red-500" },
  { emoji: "🤯", label: "Mind-blown", color: "from-pink-300 to-pink-500" },
  { emoji: "😱", label: "Scared", color: "from-blue-500 to-blue-600" },
  { emoji: "🫠", label: "Melting", color: "from-orange-200 to-orange-300" },
  { emoji: "😵‍💫", label: "Overwhelmed", color: "from-purple-200 to-purple-300" },
  { emoji: "🫥", label: "Invisible", color: "from-gray-200 to-gray-300" }
];


const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting...");
    
    try {
      // Make API call to backend
      const response = await axios.post(`${API}/api/mood`, { mood: selectedMood }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using token-based auth
        },
      });
      console.log("Mood submitted:", response.data);
      toast.success("Mood submitted!", { id: toastId });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting mood:", error);
      toast.error("Failed to submit mood. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 to-purple-100/90 p-6 relative overflow-hidden flex flex-col items-center justify-center">
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
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl bg-white/90 backdrop-blur-sm rounded-3xl border border-white/30 shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          How are you feeling today?
        </motion.h1>

        <p className="text-gray-600 text-center mb-10">
          Select your current mood to track your emotional wellbeing
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-12 justify-items-center">
          {moods.map((mood, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedMood(mood.label)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative text-6xl p-4 rounded-2xl transition-all duration-300 ${
                selectedMood === mood.label 
                  ? `shadow-lg bg-gradient-to-br ${mood.color}`
                  : "opacity-70 hover:opacity-100"
              }`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {mood.emoji}
              {selectedMood === mood.label && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <FaCheck className="text-green-500 text-sm" />
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedMood && (
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg font-medium text-gray-700">
                You selected: <span className="font-bold">{selectedMood}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleSubmit}
          disabled={!selectedMood || isSubmitting}
          className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
            selectedMood 
              ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg hover:shadow-xl"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          } transition-all relative overflow-hidden`}
          whileHover={selectedMood ? { scale: 1.02 } : {}}
          whileTap={selectedMood ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <span>Submit Mood</span>
              <FaArrowRight className="inline" />
            </>
          )}
          {selectedMood && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Daily tip */}
      <motion.div 
        className="mt-8 max-w-md text-center text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Tip: Tracking your mood regularly helps identify emotional patterns.</p>
      </motion.div>
    </div>
  );
};

export default MoodTracker;