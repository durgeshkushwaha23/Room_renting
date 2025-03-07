import React, { useState } from "react";
import axios from "../axios/axios";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role selection
  });

  const { email, password, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", formData);
      console.log(res.data);
      // Store token in local storage
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Login
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />



          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        {/* Google Authentication Button */}
        <GoogleLoginButton />

        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
