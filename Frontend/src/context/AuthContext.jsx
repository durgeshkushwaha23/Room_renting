import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext(); // ✅ Named export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      axios
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }, // Send token to backend
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token"); // Remove invalid token
          setUser(null);
        });
    }
  }, []);
  


  const register = async (formData) => {
    try {
      const res = await axios.post("/auth/register", formData);
      toast.success("Registration successful! Please log in.");
      navigate(res.data.user.role === "admin" ? "/yourrooms" : "/booking");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };



  const loginUser = async (formData) => {
    try {
      const res = await axios.post("/auth/login", formData);
  
      // Ensure the response contains the required fields
      if (!res.data.token || !res.data.user) {
        throw new Error("Invalid response from server");
      }
  
      // Store token and update user state
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
  
      // Show success message
      toast.success("Login successful!");
  
      // Redirect user based on role
      navigate(res.data.user.role === "admin" ? "/yourrooms" : "/booking");
    } catch (err) {
      // Extract error message safely
      const errorMessage = err.response?.data?.message || err.message || "Login failed!";
      toast.error(errorMessage);
    }
  };
  


  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // ✅ Named export
