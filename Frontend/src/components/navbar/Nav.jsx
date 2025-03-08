  // import { useState } from "react";
  // import { Link } from "react-router-dom";

  // const Navbar = () => {
  //   const [isOpen, setIsOpen] = useState(false);

  //   return (
  //     <nav className="bg-blue-600 text-white shadow-md">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-between h-16 items-center">
  //           {/* Logo */}
  //           <Link to="/" className="text-xl font-bold">
  //             RentRoom 🏠
  //           </Link>

  //           {/* Desktop Links */}
  //           <div className="hidden md:flex space-x-6">
  //             <Link to="/" className="hover:bg-blue-500 px-4 py-2 rounded transition">Home</Link>
  //             <Link to="/contact" className="hover:bg-blue-500 px-4 py-2 rounded transition">Contact</Link>
  //             <Link to="/login" className="hover:bg-blue-500 px-4 py-2 rounded transition">Login</Link>
  //             <Link to="/signup" className="hover:bg-blue-500 px-4 py-2 rounded transition">Signup</Link>
  //             <Link to="/rooms" className="hover:bg-blue-500 px-4 py-2 rounded transition">Find Rooms</Link>
  //             <Link to="/chat" className="hover:bg-blue-500 px-4 py-2 rounded transition">Chat</Link>
  //             <Link to="/logout" className="bg-red-500 px-4 py-2 rounded transition">Logout</Link>

  //           </div>

  //           {/* Mobile Menu Button */}
  //           <button
  //             className="md:hidden focus:outline-none"
  //             onClick={() => setIsOpen(!isOpen)}
  //           >
  //             {isOpen ? "✖" : "☰"}
  //           </button>
  //         </div>

  //         {/* Mobile Menu */}
  //         {isOpen && (
  //           <div className="md:hidden bg-blue-700 space-y-2 p-4">
  //             <Link to="/" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Home</Link>
  //             <Link to="/contact" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Contact</Link>
  //             <Link to="/login" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Login</Link>
  //             <Link to="/signup" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Signup</Link>
  //             <Link to="/rooms" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Find Rooms</Link>
  //             <Link to="/chat" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Chat</Link>
  //           </div>
  //         )}
  //       </div>
  //     </nav>
  //   );
  // };

  // export default Navbar;


  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext";
  import { FiMenu, FiX } from "react-icons/fi"; // Import menu icons

  const Navbar = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
          🏠 RentRooms
          </Link>

          {/* Hamburger Menu - Mobile View */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Navbar Links */}
          <ul
            className={`absolute md:static bg-blue-600 md:bg-transparent top-16 left-0 w-full md:w-auto md:flex gap-4 p-4 md:p-0 transition-transform ${
              isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <Link to="/" className="block py-2 px-4 hover:bg-blue-500 rounded-md">
              Home
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 hover:bg-blue-500 rounded-md"
            >
              Contact
            </Link>

            {user ? (
              user.role === "admin" ? (
                <>
                  <Link
                    to="/yourrooms"
                    className="block py-2 px-4 hover:bg-blue-500 rounded-md"
                  >
                    Your Rooms
                  </Link>
                  <Link
                    to="/chat"
                    className="block py-2 px-4 hover:bg-blue-500 rounded-md"
                  >
                    Chat
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/booking"
                    className="block py-2 px-4 hover:bg-blue-500 rounded-md"
                  >
                    Booking
                  </Link>
                  <Link
                    to="/findroom"
                    className="block py-2 px-4 hover:bg-blue-500 rounded-md"
                  >
                    Find Room
                  </Link>
                  <Link
                    to="/chat"
                    className="block py-2 px-4 hover:bg-blue-500 rounded-md"
                  >
                    Chat
                  </Link>
                </>
              )
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 hover:bg-blue-500 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 px-4 hover:bg-blue-500 rounded-md"
                >
                  Signup
                </Link>
                <Link
                  to="/findroom"
                  className="block py-2 px-4 hover:bg-blue-500 rounded-md"
                >
                  Find Rooms
                </Link>
                <Link
                  to="/chat"
                  className="block py-2 px-4 hover:bg-blue-500 rounded-md"
                >
                  Chat
                </Link>
              </>
            )}

            {user && (
              <Link
                to="/logout"
                className="block py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md"
              >
                Logout
              </Link>
            )}
          </ul>
        </div>
      </nav>
    );
  };

  export default Navbar;

