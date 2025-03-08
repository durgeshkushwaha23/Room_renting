// import React, { useState } from "react";
// import axios from "../axios/axios";
// import GoogleLoginButton from "./GoogleLoginButton";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "user",
//     phone: "",
//   });

//   const { email, password, role, phone } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/auth/login", formData);
//       localStorage.setItem("token", res.data.token);

//       toast.success("Login successful!", { autoClose: 2000 });

//       // Redirect based on role
//       if (role === "admin") {
//         navigate("/yourrooms"); // Redirect admin
//       } else {
//         navigate("/booking"); // Redirect user
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed!", {
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
//           Login
//         </h2>
//         <form onSubmit={onSubmit} className="space-y-4">
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

//           <select
//             name="role"
//             value={role}
//             onChange={onChange}
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>

//           {role === "admin" && (
//             <input
//               type="text"
//               name="phone"
//               value={phone}
//               onChange={onChange}
//               placeholder="Phone Number"
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
//             />
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="flex items-center my-4">
//           <div className="w-full h-px bg-gray-300"></div>
//           <span className="px-3 text-gray-500 text-sm">OR</span>
//           <div className="w-full h-px bg-gray-300"></div>
//         </div>

//         <GoogleLoginButton />

//         <p className="text-center text-gray-600 text-sm mt-4">
//           Don't have an account?{" "}
//           <Link to={"/signup"} className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { loginUser } = useContext(AuthContext); // Use context for login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
    phone: "",
  });

  const { email, password, role, phone } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    loginUser(formData); // Use context function
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
{/* 
          <select
            name="role"
            value={role}
            onChange={onChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select> */}

          {role === "admin" && (
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* <div className="flex items-center my-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div> */}

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
