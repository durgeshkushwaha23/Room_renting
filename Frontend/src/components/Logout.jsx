// import React, { useEffect, useState } from "react";
// import axios from "../axios/axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Logout = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const logout = async () => {
//       try {
//         await axios.post("/auth/logout");
//         localStorage.removeItem("token");

//         toast.success("Logged out successfully!", {
//           autoClose: 900,
//         });

//         setTimeout(() => {
//           navigate("/signup");
//         }, 500);
//       } catch (err) {
//         toast.error(err.response?.data?.message || "Logout failed!", {
//           autoClose: 2000,
//         });

//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     logout();
//   }, [navigate]);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="text-center">
//         {loading ? (
//           <div className="text-lg font-semibold text-gray-700">
//             Logging out...
//             <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin inline-block ml-2"></div>
//           </div>
//         ) : (
//           <p className="text-lg text-gray-700">Redirecting...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Logout;


import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Use logout function from AuthContext
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout(); // Call logout function from AuthContext

        toast.success("Logged out successfully!", {
          autoClose: 900,
        });

        setTimeout(() => {
          navigate("/signup");
        }, 500);
      } catch (err) {
        toast.error(err.message || "Logout failed!", {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    handleLogout();
  }, [navigate, logout]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        {loading ? (
          <div className="text-lg font-semibold text-gray-700">
            Logging out...
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin inline-block ml-2"></div>
          </div>
        ) : (
          <p className="text-lg text-gray-700">Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default Logout;
