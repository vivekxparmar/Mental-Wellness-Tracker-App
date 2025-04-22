import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload =
      type === "register"
        ? formData
        : { email: formData.email, password: formData.password };

    onSubmit(payload);
  };

  return (
    <motion.div
      className="w-full max-w-md bg-white/90 backdrop-blur-xl p-10 rounded-[10px] shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl uppercase font-normal text-center mb-8 text-gray-900 tracking-normal">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {type === "register" && (
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full text-lg py-3 bg-gradient-to-r from-indigo-500 to-pink-400 text-white font-normal rounded-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg"
        >
          {type === "login" ? "Login" : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
        {type === "login" && (
          <>
            <div>
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:underline transition"
              >
                Forgot your password?
              </Link>
            </div>
            <div>
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:underline transition"
              >
                Register
              </Link>
            </div>
          </>
        )}

        {type === "register" && (
          <div>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline transition"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AuthForm;
