// import React, { useState } from "react";
// import axios from "../axios/axios";
// import GoogleLoginButton from "./GoogleLoginButton";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     role: "user",
//     phone: "",
//   });

//   const { fullName, email, password, role, phone } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/register", formData);
//       toast.success("Registration successful! Redirecting...", {
//         autoClose: 2000,
//       });

//       // Redirect based on role
//       setTimeout(() => {
//         if (role === "admin") {
//           navigate("/yourrooms"); // Admin goes to "Create Your Room"
//         } else {
//           navigate("/booking"); // User goes to "Booking"
//         }
//       }, 2000);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed!", {
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
//           Register
//         </h2>
//         <form onSubmit={onSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="fullName"
//             value={fullName}
//             onChange={onChange}
//             placeholder="Full Name"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
//           />
//           <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={onChange}
//             placeholder="Email"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
//           />
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={onChange}
//             placeholder="Password"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
//           />

//           {/* Role Selection */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Register as:
//             </label>
//             <div className="flex space-x-4">
//               <label className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="user"
//                   checked={role === "user"}
//                   onChange={onChange}
//                   className="accent-blue-600"
//                 />
//                 <span>User</span>
//               </label>
//               <label className="flex items-center space-x-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   name="role"
//                   value="admin"
//                   checked={role === "admin"}
//                   onChange={onChange}
//                   className="accent-blue-600"
//                 />
//                 <span>Admin</span>
//               </label>
//             </div>
//           </div>

//           {/* Show Phone Field for Admins */}
//           {role === "admin" && (
//             <input
//               type="text"
//               name="phone"
//               value={phone}
//               onChange={onChange}
//               placeholder="Phone Number (For Admins)"
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Register
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-4">
//           <div className="w-full h-px bg-gray-300"></div>
//           <span className="px-3 text-gray-500 text-sm">OR</span>
//           <div className="w-full h-px bg-gray-300"></div>
//         </div>

//         {/* Google Authentication Button */}
//         <GoogleLoginButton />

//         <p className="text-center text-gray-600 text-sm mt-4">
//           Already have an account?{" "}
//           <Link to={"/login"} className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import GoogleLoginButton from "./GoogleLoginButton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); // Use register function from AuthContext
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
  });
  const [loading, setLoading] = useState(false); // Prevent multiple submissions

  const { fullName, email, password, role, phone } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);
    try {
      await register(formData); // Call register function from AuthContext
      toast.success("Registration successful! Redirecting...", { autoClose: 2000 });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.message || "Registration failed!");
    

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Register</h2>
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
            <label className="block text-gray-700 font-medium mb-1">Register as:</label>
            <select
              name="role"
              value={role}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
            disabled={loading}
            className={`w-full py-2 rounded-lg transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
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
