import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
const API = "https://mental-wellness-tracker-app-1.onrender.com";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "radial-gradient(circle at center, #f5f5f5 0%, #e0e0e0 100%)",
        fontFamily: "'Montserrat', sans-serif"
      }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        {/* Light border effect */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" 
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 50%)",
            margin: "-2px",
            zIndex: -1
          }}
        />
        
        <div 
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-300"
          style={{
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)"
          }}
        >
          {/* Profile icon with golden glow */}
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <FaUserCircle 
                className="text-7xl mx-auto"
                style={{ 
                  color: "#D4AF37",
                  filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))"
                }}
              />
              <div className="absolute inset-0 rounded-full border-2 border-opacity-30 border-gold pointer-events-none" 
                style={{ borderColor: "#D4AF37", margin: "-2px" }}
              />
            </div>
          </motion.div>

          {/* User info with elegant typography */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 
              className="text-3xl font-light text-center mb-1 text-black tracking-wider"
              style={{
                textShadow: "0 2px 10px rgba(212, 175, 55, 0.3)"
              }}
            >
              {user?.username}
            </h2>
            <p 
              className="text-center mb-8 text-black"
              style={{
                letterSpacing: "1px",
                fontSize: "0.9rem"
              }}
            >
              {user?.email}
            </p>
          </motion.div>

          {/* Logout button */}
          <motion.button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.1) 100%)",
              color: "#D4AF37",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              letterSpacing: "1px"
            }}
            whileHover={{
              background: "linear-gradient(90deg, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.2) 100%)",
              boxShadow: "0 0 15px rgba(212, 175, 55, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">LOGOUT</span>
            <motion.div 
              className="absolute inset-0 bg-gold opacity-0 z-0"
              style={{ backgroundColor: "#D4AF37" }}
              whileHover={{ opacity: 0.1 }}
            />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
