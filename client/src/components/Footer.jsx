import { Link, useNavigate } from "react-router-dom";
import { Github, Mail, Instagram, Linkedin } from "lucide-react";
import { toast } from "react-hot-toast";

const Footer = () => {
  const navigate = useNavigate();

  // Check if user is authenticated (via token)
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const handleProtectedNav = (path) => {
    if (isAuthenticated()) {
      navigate(path);
    } else {
      toast.error("Please login to access this feature.");
    }
  };

  return (
    <footer className="bg-gradient-to-t from-white/80 to-white/60 backdrop-blur-xl border-t border-white/30 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            MindSpace 🧠
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Your peaceful place to reflect and grow.
          </p>
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-indigo-600 transition-all duration-200">
            Home
          </Link>
          <Link to="/login" className="hover:text-indigo-600 transition-all duration-200">
            Login
          </Link>
          <Link to="/register" className="hover:text-indigo-600 transition-all duration-200">
            Register
          </Link>
          <button
            onClick={() => handleProtectedNav("/journal")}
            className="hover:text-indigo-600 transition-all duration-200"
          >
            Journal
          </button>
          <button
            onClick={() => handleProtectedNav("/mood")}
            className="hover:text-indigo-600 transition-all duration-200"
          >
            Mood Tracker
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:mindspace@email.com"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/vivek-parmar-047009261"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-gray-400 py-4 border-t border-white/20">
        &copy; {new Date().getFullYear()} MindSpace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
