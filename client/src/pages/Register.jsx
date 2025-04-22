import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";


const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      const API = process.env.REACT_APP_API_BASE_URL;
      await axios.post(`${API}/api/auth/register`, data);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      // alert("Registration failed 🥲");
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-sky-100">
      <AuthForm type="register" onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
