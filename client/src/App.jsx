import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layouts/Layout";
import MoodTracker from "./pages/MoodTracker";
import Journal from "./pages/Journal";
import MoodChart from "./pages/MoodChart";
import Profile from "./pages/Profile";

function App() {
  return (
      <Router>
        <Layout>
        <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mood"
              element={
                <ProtectedRoute>
                  <MoodTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journal"
              element={
                <ProtectedRoute>
                  <Journal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <MoodChart />
                </ProtectedRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;
