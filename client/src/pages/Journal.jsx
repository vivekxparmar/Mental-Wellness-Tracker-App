import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaPenFancy, FaSpinner, FaRegSmile, FaRegFrown, FaRegMeh } from "react-icons/fa";
import { RiQuillPenLine } from "react-icons/ri";
import {toast } from "react-hot-toast";
const API = process.env.REACT_APP_API_BASE_URL;

const Journal = () => {
  const { token } = useAuth();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setIsSubmitting(true);
    const submit = toast.loading("Submitting Journal...");
    try {
      const res = await axios.post(
        `${API}/api/journal`,
        { entry: text }, // Make sure this matches the backend key `entry`
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data);
      setText("");
    } catch (err) {
      console.error("Error submitting journal:", err);
      toast.error("Error submitting journal", {id : submit});
    } finally {
      setIsSubmitting(false);
      toast.success("Journal submitted successfully", {id : submit});
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const getSentimentIcon = () => {
    if (!result) return null;
    if (result.sentimentScore > 0.3) return <FaRegSmile className="text-green-500 text-2xl" />;
    if (result.sentimentScore < -0.3) return <FaRegFrown className="text-red-500 text-2xl" />;
    return <FaRegMeh className="text-yellow-500 text-2xl" />;
  };

  const getSentimentColor = () => {
    if (!result) return "";
    if (result.sentimentScore > 0.3) return "bg-green-100 border-green-200";
    if (result.sentimentScore < -0.3) return "bg-red-100 border-red-200";
    return "bg-yellow-100 border-yellow-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/90 to-purple-100/90 p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
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

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg mb-4">
            <RiQuillPenLine className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Reflective Journal</h1>
          <p className="text-gray-600">Express your thoughts and gain insights</p>
        </motion.div>

        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 flex items-center">
            <FaPenFancy className="text-white mr-2" />
            <span className="text-white font-medium">Today's Entry</span>
            <div className="ml-auto text-white text-sm">
              {charCount}/1000
            </div>
          </div>

          <textarea
            rows="10"
            value={text}
            onChange={handleTextChange}
            className="w-full p-6 focus:outline-none resize-none bg-transparent text-gray-700 placeholder-gray-400"
            placeholder="Begin writing your thoughts here... Let your emotions flow freely. What's on your mind today?"
            maxLength={1000}
          />

          <div className="border-t border-gray-100 p-4 flex justify-end">
            <motion.button
              onClick={handleSubmit}
              disabled={!text.trim() || isSubmitting}
              className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                text.trim() 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              } transition-all relative overflow-hidden`}
              whileHover={text.trim() ? { scale: 1.02 } : {}}
              whileTap={text.trim() ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span>Analyze & Save</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </>
              )}
              {text.trim() && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              className={`${getSentimentColor()} border rounded-2xl p-6 mb-8 shadow-sm`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Your Sentiment Analysis</h3>
                {getSentimentIcon()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Sentiment Score</h4>
                  <p className="text-2xl font-bold">
                    {result.sentimentScore > 0 ? "+" : ""}
                    {result.sentimentScore.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Emotional Tone</h4>
                  <p className="text-xl font-semibold capitalize">
                    {result.sentimentScore > 0.3 
                      ? "Positive" 
                      : result.sentimentScore < -0.3 
                        ? "Negative" 
                        : "Neutral"}
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-xl border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Key Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords?.slice(0, 3).map((word, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {result.summary && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">AI Reflection</h4>
                  <p className="text-gray-700 italic">"{result.summary}"</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 p-6 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Need inspiration?</h3>
          <p className="text-gray-600 mb-4">Today's writing prompt: <span className="font-medium">"What was the most meaningful moment of your day and why?"</span></p>
          <button className="text-blue-500 hover:underline text-sm">
            Show another prompt
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Journal;
