import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const API = "https://mental-wellness-tracker-app-1.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("AuthContext: Error fetching profile", err);
        setUser(null);
      }
    };
    fetchProfile();
  }, [token]);

  const login = async (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  
    try {
      const res = await axios.get(`${API}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Login: Error fetching profile", err);
      setUser(null);
    }
  };
  

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
