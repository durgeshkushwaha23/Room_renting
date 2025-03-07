import React, { useState } from "react";
import axios from "../axios/axios";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user", // default role
    phone: "",
  });

  const { fullName, email, password, role, phone } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", formData);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Register
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={onChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
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

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Register as:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={onChange}
                  className="accent-blue-600"
                />
                <span>User</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={onChange}
                  className="accent-blue-600"
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          {/* Show Phone Field for Admins */}
          {role === "admin" && (
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder="Phone Number (For Admins)"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
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
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
