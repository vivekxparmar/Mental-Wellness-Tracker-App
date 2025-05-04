import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const isMobile = window.innerWidth <= 768;
  return (
    <div className="bg-gradient-to-br from-[#e0f7fa] to-[#ffecb3] min-h-screen text-gray-800 overflow-x-hidden font-sans">
      {/* Premium Hero Section with Advanced Glassmorphism */}
      <section className="relative flex flex-col items-center justify-center min-h-screen py-20 px-6 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-teal-50 to-purple-50 opacity-90"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

          {/* Floating animated circles */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal-400/20 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* Main content container with premium glass effect */}
        <motion.div
          className="relative z-10 w-full max-w-6xl backdrop-blur-xl bg-white/40 rounded-2xl border border-white/30 shadow-2xl shadow-teal-400/20 p-12 sm:p-16 overflow-hidden"
          initial={isMobile ? {} :{ opacity: 0, scale: 0.95 }}
          animate={isMobile ? {} :{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Subtle animated border */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <motion.div
              className="absolute inset-0 border-2 border-transparent border-t-teal-400/30 border-r-purple-400/30"
              animate={isMobile ? {} : { rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-20">
            <motion.h1
              className="text-5xl sm:text-7xl md:text-8xl font-bold text-gray-900 tracking-tight"
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">
                MindSpace
              </span>{" "}
              <motion.span
                animate={isMobile ? {} : { rotate: [0, 10, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3,
                }}
              >
                🧘‍♀️
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-8 text-xl sm:text-2xl md:text-3xl max-w-4xl mx-auto text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Your{" "}
              <span className="font-semibold text-teal-600">
                personal sanctuary
              </span>{" "}
              for mindfulness, mood tracking, and emotional journaling.
            </motion.p>

            {/* Stats showcase */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "10K+", label: "Active Users" },
                { value: "95%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="px-6 py-3 backdrop-blur-sm bg-white/50 rounded-xl border border-white/30 shadow-sm"
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="text-2xl font-bold text-teal-600">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA with advanced hover effects */}
            <motion.div
              className="mt-16 flex flex-col sm:flex-row justify-center gap-4"
              initial={isMobile ? {} : { scale: 0.9 }}
              animate={isMobile ? {} : { scale: 1 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link to="/register" className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:from-teal-600 group-hover:to-teal-700 transition-all duration-500"></div>
                <div className="relative z-10 flex items-center justify-center px-8 py-4 font-normal text-white tracking-wide">
                  <span className="relative inline-block group-hover:scale-105 transition-transform">
                    Get Started Free
                  </span>
                  <motion.span
                    className="ml-2 inline-block"
                    animate={isMobile ? {} : { x: [0, 4, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                      delay: 1,
                    }}
                  >
                    →
                  </motion.span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20"></div>
                </div>
              </Link>

              <a href="#features" className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/80 rounded-xl shadow-sm border border-gray-200 group-hover:bg-white transition-all duration-300"></div>
                <div className="relative z-10 flex items-center justify-center px-8 py-4 font-medium text-gray-800 tracking-wide">
                  <span className="relative inline-block group-hover:scale-105 transition-transform">
                    Explore Features
                  </span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20"></div>
                </div>
              </a>
            </motion.div>

            {/* Trust indicators */}
            {/* <motion.div
              className="mt-16 opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1 }}
            >
              <p className="text-sm text-gray-500 mb-3">TRUSTED BY TEAMS AT</p>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                {["Google", "Apple", "Spotify", "Netflix", "Amazon"].map(
                  (company, index) => (
                    <motion.div
                      key={index}
                      className="text-lg font-medium text-gray-600 opacity-70 hover:opacity-100 transition-opacity"
                      whileHover={{ y: -2 }}
                    >
                      {company}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div> */}
          </div>
        </motion.div>

        {/* Floating meditation illustration */}
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 hidden lg:block"
          animate={isMobile ? {} : {
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2936/2936886.png"
            alt="Meditation illustration"
            className="w-full h-full object-contain opacity-90"
          />
        </motion.div>

        {/* Scroll indicator */}
        {/* <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-xs text-gray-500 mb-2">Scroll to explore</p>
          <div className="w-4 h-8 border-2 border-gray-400 rounded-full">
            <motion.div
              className="w-1 h-2 bg-gray-500 mx-auto mt-1 rounded-full"
              animate={{ y: [0, 4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div> */}
      </section>

      {/* Premium Features Section */}
      <section id="features" className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-teal-50 to-purple-50 opacity-60"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-1/4 left-10 w-48 h-48 rounded-full bg-teal-400/10 blur-3xl"
            animate={isMobile ? {} : {
              x: [0, 40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Section header */}
        <div className="relative z-10 max-w-7xl mx-auto text-center mb-20">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={isMobile ? {} : { opacity: 0, y: -30 }}
            whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Powerful{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">
              Features
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={isMobile ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Everything you need to understand and improve your mental wellbeing
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="relative z-10 max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Mood Tracking",
              desc: "Log your emotional states with our intuitive interface and discover meaningful patterns over time.",
              icon: "😊",
              stats: "95% accuracy",
              color: "from-teal-400 to-teal-600",
            },
            {
              title: "Journaling",
              desc: "Write freely with AI-powered sentiment analysis and personalized writing prompts.",
              icon: "📝",
              stats: "500+ templates",
              color: "from-purple-400 to-purple-600",
            },
            {
              title: "Progress Analytics",
              desc: "Visualize your journey with beautiful, interactive charts and weekly reports.",
              icon: "📊",
              stats: "15+ metrics",
              color: "from-blue-400 to-blue-600",
            },
            {
              title: "Mindfulness Exercises",
              desc: "Access guided meditations and breathing exercises tailored to your mood.",
              icon: "🧘‍♂️",
              stats: "50+ exercises",
              color: "from-emerald-400 to-emerald-600",
            },
            {
              title: "Sleep Tracking",
              desc: "Monitor sleep patterns and get personalized recommendations for better rest.",
              icon: "😴",
              stats: "Sleep quality scores",
              color: "from-indigo-400 to-indigo-600",
            },
            {
              title: "Community Support",
              desc: "Connect with others in safe, moderated groups based on shared experiences.",
              icon: "👥",
              stats: "10K+ members",
              color: "from-pink-400 to-pink-600",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="group relative h-full"
              initial={isMobile ? {} : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Feature card */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              <div className="relative h-full bg-white/80 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300 group-hover:border-white/50">
                {/* Decorative corner */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${item.color} rounded-bl-2xl opacity-20`}
                ></div>

                {/* Content */}
                <div className="p-8 h-full flex flex-col">
                  {/* Animated icon */}
                  <motion.div
                    className="text-5xl mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-white/50"
                    whileHover={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">{item.desc}</p>

                  {/* Stats badge */}
                  <div className="mt-auto">
                    <motion.div
                      className="inline-block px-4 py-2 rounded-full bg-white/90 text-sm font-medium shadow-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}
                      >
                        {item.stats}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        {/* <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/all-features"
            className="inline-flex items-center px-8 py-4 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            <span className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
              Explore All Features
            </span>
            <motion.span
              className="ml-2 text-xl"
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                delay: 1,
              }}
            >
              →
            </motion.span>
          </Link>
        </motion.div> */}

        {/* Floating decorative elements */}
        <motion.div
          className="absolute bottom-20 right-20 hidden lg:block"
          animate={isMobile ? {} : {
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-32 h-32 rounded-full bg-teal-400/10 blur-2xl"></div>
        </motion.div>
      </section>

      {/* Premium About Section */}
      <section className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

          {/* Floating gradient blobs */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-teal-400/10 blur-3xl"
            animate={isMobile ? {} : {
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl"
            animate={isMobile ? {} : {
              x: [0, 20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </div>

        {/* Content container */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto backdrop-blur-sm bg-white/70 rounded-3xl border border-white/30 shadow-xl overflow-hidden"
          initial={isMobile ? {} : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative border animation */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <motion.div
              className="absolute inset-0 border-2 border-transparent border-t-teal-400/20 border-r-purple-400/20"
              animate={isMobile ? {} : { rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 p-12 md:p-16">
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8"
              initial={isMobile ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative inline-block">
                What is{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">
                  MindSpace
                </span>
                ?
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"
                  initial={isMobile ? {} : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your{" "}
              <span className="font-semibold text-teal-600">
                personal sanctuary
              </span>{" "}
              for mental wellness — a comprehensive platform that combines mood
              tracking, emotional journaling, and data visualization to help you
              understand and improve your mental health.
            </motion.p>

            {/* Key points grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: "📊",
                  title: "Data-Driven Insights",
                  desc: "Visual analytics reveal patterns in your emotional wellbeing",
                },
                {
                  icon: "📝",
                  title: "Smart Journaling",
                  desc: "AI-powered writing prompts and sentiment analysis",
                },
                {
                  icon: "🧠",
                  title: "Mindfulness Tools",
                  desc: "Guided exercises tailored to your current state",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            {/* <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/how-it-works"
                className="relative overflow-hidden group px-8 py-4 rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:from-teal-600 group-hover:to-teal-700 transition-all duration-500"></div>
                <div className="relative z-10 flex items-center justify-center text-white font-semibold">
                  <span>See How It Works</span>
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                      delay: 1,
                    }}
                  >
                    →
                  </motion.span>
                </div>
              </Link> 

              <Link
                to="/testimonials"
                className="relative overflow-hidden group px-8 py-4 rounded-xl"
              >
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 group-hover:bg-white transition-all duration-300"></div>
                <div className="relative z-10 flex items-center justify-center text-gray-800 font-medium">
                  <span>Hear From Users</span>
                </div>
              </Link>
            </motion.div> */}
          </div>
        </motion.div>

        {/* Floating decoration */}
        <motion.div
          className="absolute bottom-20 left-20 hidden lg:block"
          animate={isMobile ? {} : {
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-32 h-32 rounded-full bg-purple-400/10 blur-2xl"></div>
        </motion.div>
      </section>

      {/* Premium Benefits Section */}
      <section className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-b from-white to-blue-50">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

          {/* Floating gradient blobs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-400/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </div>

        {/* Section header */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Transform Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
              Mental Wellbeing
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Discover the powerful benefits of mindful self-tracking and
            reflection
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="relative z-10 max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Self-Awareness",
              description: "Identify patterns in your emotions and behaviors",
              icon: "🔍",
              color: "from-teal-100 to-teal-200",
              stats: "85% users report better self-understanding",
            },
            {
              title: "Stress Relief",
              description: "Release tension through guided journaling",
              icon: "🧘‍♀️",
              color: "from-blue-100 to-blue-200",
              stats: "60% reduction in stress levels",
            },
            {
              title: "Motivation",
              description: "Stay encouraged by visualizing progress",
              icon: "📈",
              color: "from-purple-100 to-purple-200",
              stats: "3x more consistent usage",
            },
            {
              title: "Accessibility",
              description: "Use anytime, anywhere with our mobile app",
              icon: "📱",
              color: "from-indigo-100 to-indigo-200",
              stats: "24/7 support available",
            },
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              className="group relative h-full"
              initial={isMobile ? {} :{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Hover effect background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
              ></div>

              {/* Benefit card */}
              <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300 group-hover:border-white/50">
                {/* Decorative corner */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${benefit.color} rounded-bl-2xl opacity-20`}
                ></div>

                {/* Content */}
                <div className="p-8 h-full flex flex-col">
                  {/* Animated icon */}
                  <motion.div
                    className="text-5xl mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-white/50"
                    whileHover={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {benefit.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {benefit.description}
                  </p>

                  {/* Stats badge */}
                  <motion.div
                    className="mt-auto pt-4 border-t border-gray-100"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-sm text-gray-500">{benefit.stats}</p>
                  </motion.div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto mt-20 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg"
          initial={isMobile ? {} :{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center text-3xl text-white">
              👤
            </div>
            <div>
              <blockquote className="text-xl italic text-gray-700 mb-4">
                "MindSpace helped me recognize patterns in my mood swings I
                never noticed before. The journaling feature became my daily
                therapy."
              </blockquote>
              <p className="font-medium text-gray-900">
                — Sarah K.,{" "}
                <span className="text-gray-600">Product Designer</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating decoration */}
        <motion.div
          className="absolute bottom-20 left-20 hidden lg:block"
          animate={isMobile ? {} :{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-32 h-32 rounded-full bg-blue-400/10 blur-2xl"></div>
        </motion.div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

          {/* Floating gradient blobs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-400/10 blur-3xl"
            animate={isMobile ? {} :{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl"
            animate={isMobile ? {} :{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </div>

        {/* Section header */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center mb-16"
          initial={isMobile ? {} :{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Voices of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              Transformation
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from our community of mindful users
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="relative z-10 max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Aanya Patel",
              role: "UX Designer",
              feedback:
                "MindSpace has become my daily emotional compass. The mood tracking revealed patterns I never noticed, helping me navigate stressful periods with more awareness.",
              rating: 5,
              avatar: "👩🏽‍💻",
            },
            {
              name: "Rohan Desai",
              role: "Software Engineer",
              feedback:
                "The journaling experience is incredibly smooth and therapeutic. I've written more in 3 months with MindSpace than in 3 years with physical journals!",
              rating: 5,
              avatar: "👨🏽‍💻",
            },
            {
              name: "Meera Krishnan",
              role: "Teacher",
              feedback:
                "Seeing my weekly mood charts is both motivating and enlightening. The insights helped me recognize triggers and celebrate small wins in my mental health journey.",
              rating: 4,
              avatar: "👩🏽‍🏫",
            },
            {
              name: "Ethan Wong",
              role: "Medical Student",
              feedback:
                "As someone who struggles with anxiety, the breathing exercises integrated with my mood data have been a game-changer for my daily routine.",
              rating: 5,
              avatar: "👨🏻‍⚕️",
            },
            {
              name: "Priya Sharma",
              role: "Marketing Director",
              feedback:
                "The community features created unexpected connections. Sharing experiences (anonymously) made me feel less alone in my struggles.",
              rating: 4,
              avatar: "👩🏽‍💼",
            },
            {
              name: "David Kim",
              role: "Freelance Writer",
              feedback:
                "I appreciate how MindSpace respects privacy while providing powerful analytics. It's rare to find this balance in mental health apps.",
              rating: 5,
              avatar: "👨🏻‍💻",
            },
          ].map((user, i) => (
            <motion.div
              key={i}
              className="group relative h-full"
              initial={isMobile ? {} :{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

              {/* Testimonial card */}
              <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-300 group-hover:border-white/50">
                {/* Content */}
                <div className="p-8 h-full flex flex-col">
                  {/* Rating stars */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, starIdx) => (
                      <svg
                        key={starIdx}
                        className={`w-5 h-5 ${
                          starIdx < user.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-lg italic text-gray-700 mb-6 flex-grow">
                    "{user.feedback}"
                  </blockquote>

                  {/* User info */}
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 flex items-center justify-center text-2xl mr-4">
                      {user.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {user.name}
                      </h4>
                      <p className="text-sm text-gray-600">{user.role}</p>
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        {/* <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/join"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            <span className="relative inline-block group-hover:scale-105 transition-transform">
              Join Our Community
            </span>
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                delay: 1,
              }}
            >
              →
            </motion.span>
          </Link>
        </motion.div> */}

        {/* Floating decoration */}
        <motion.div
          className="absolute bottom-20 left-20 hidden lg:block"
          animate={isMobile ? {} :{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-32 h-32 rounded-full bg-blue-400/10 blur-2xl"></div>
        </motion.div>
      </section>

      {/* Premium Newsletter Section */}
      <section className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-br from-teal-100 to-blue-100">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

          {/* Floating gradient blobs */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-teal-400/10 blur-3xl"
            animate={isMobile ? {} :{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl"
            animate={isMobile ? {} :{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-2xl mx-auto text-center backdrop-blur-sm bg-white/70 rounded-3xl border border-white/30 shadow-xl p-12"
          initial={isMobile ? {} :{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={isMobile ? {} :{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Stay{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
              Connected
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-700 mb-8"
            initial={isMobile ? {} :{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join our newsletter for exclusive wellness tips, app updates, and
            mental health resources
          </motion.p>

          <motion.form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={isMobile ? {} :{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative flex-grow">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-6 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all"
                required
              />
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-transparent border-t-teal-400/30 border-r-blue-400/30 pointer-events-none"
                animate={isMobile ? {} :{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <motion.button
              type="submit"
              className="relative overflow-hidden px-8 py-2 rounded-xl font-normal"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl shadow-lg group-hover:from-teal-600 group-hover:to-blue-700 transition-all duration-500"></div>
              <span className="relative z-10 text-white">Subscribe</span>
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20"></div>
              </div>
            </motion.button>
          </motion.form>

          <motion.p
            className="text-sm text-gray-500 mt-6"
            initial={isMobile ? {} :{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full bg-${
                i % 2 ? "teal" : "purple"
              }-400/20`}
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={isMobile ? {} :{
                y: [0, (Math.random() - 0.5) * 100],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8"
            initial={isMobile ? {} :{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600">
              Mind Matters
            </span>{" "}
            <motion.span
              animate={isMobile ? {} :{ rotate: [0, 15, -15, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4,
              }}
            >
              💜
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={isMobile ? {} :{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Designed with calming animations, soothing colors, and thoughtful
            interactions to create a safe space for your mental wellbeing
            journey.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row item-center justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/login"
              className="relative overflow-hidden group px-10 py-3 rounded-xl font-normal"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg group-hover:from-teal-600 group-hover:to-teal-700 transition-all duration-500"></div>
              <span className="relative z-10 text-white">Log In</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20"></div>
              </div>
            </Link>

            <Link
              to="/register"
              className="relative overflow-hidden group px-10 py-3 rounded-xl font-normal"
            >
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm group-hover:bg-white transition-all duration-300"></div>
              <span className="relative z-10 text-gray-800">Sign Up Free</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20"></div>
              </div>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-6 opacity-80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-teal-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-600">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-teal-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-600">
                No Credit Card Required
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-teal-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-600">Loved by 10K+ Users</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
