import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // ✅ Import context
const API = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Use login from context

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, data);
      const token = res.data.token;

      await login(token); // ✅ AuthContext will save token + fetch profile

      toast.success("Login Successful");
      navigate("/dashboard"); // ✅ Redirect after everything is ready
    } catch (err) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-100 to-sky-100">
      <AuthForm type="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
