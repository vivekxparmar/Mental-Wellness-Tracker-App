import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext"; // adjust path
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 shadow-xl" : "bg-white/60"
      } backdrop-blur-2xl border-b border-white/30`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-700 hover:opacity-90 transition"
        >
          MindSpace 🧘‍♂️
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-gray-800 font-medium items-center relative">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "text-teal-600"
                : "hover:text-teal-500"
            } transition`}
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className={`${
                  location.pathname === "/login"
                    ? "text-teal-600"
                    : "hover:text-teal-500"
                } transition`}
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative md:flex gap-8 text-gray-800 font-medium items-center">
              <Link
                to="/dashboard"
                className={`${
                  location.pathname === "/dashboard"
                    ? "text-teal-600"
                    : "hover:text-teal-500"
                } transition`}
              >
                Dashboard
              </Link>
              <button
                onClick={toggleDropdown}
                className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold text-sm flex items-center justify-center shadow-md hover:opacity-90"
              >
                {user.username?.charAt(0)?.toUpperCase() || "U"}
              </button>

              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 mt-[300px] w-56 bg-white/90 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl overflow-hidden z-50"
                >
                  {/* User info section with subtle gradient */}
                  <div className="p-4 bg-gradient-to-br from-blue-50/50 to-purple-50/50 border-b border-white/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 truncate max-w-[160px]">
                          {user.username}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[160px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu items section */}
                  <div className="p-2">
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50/80 rounded-lg p-2 transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      My Profile
                    </button>

                    <button
                      onClick={() => navigate("/settings")}
                      className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50/80 rounded-lg p-2 transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      Settings
                    </button>
                  </div>

                  {/* Logout section with divider */}
                  <div className="border-t border-white/20 p-2">
                    <motion.button
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 text-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg py-2 px-3 shadow-sm transition-all duration-200 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Logout
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pb-6 pt-2 backdrop-blur-lg bg-white/70 border-t border-white/20 shadow-md"
          >
            <div className="flex flex-col gap-4 text-gray-800 text-md">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  {/* <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link> */}
                </>
              ) : (
                <>
                  <p className="text-sm">Hi, {user.username}</p>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      navigate("/login");
                    }}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
