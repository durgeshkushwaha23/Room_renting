import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            RentRoom 🏠
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:bg-blue-500 px-4 py-2 rounded transition">Home</Link>
            <Link to="/contact" className="hover:bg-blue-500 px-4 py-2 rounded transition">Contact</Link>
            <Link to="/login" className="hover:bg-blue-500 px-4 py-2 rounded transition">Login</Link>
            <Link to="/signup" className="hover:bg-blue-500 px-4 py-2 rounded transition">Signup</Link>
            <Link to="/rooms" className="hover:bg-blue-500 px-4 py-2 rounded transition">Find Rooms</Link>
            <Link to="/chat" className="hover:bg-blue-500 px-4 py-2 rounded transition">Chat</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-blue-700 space-y-2 p-4">
            <Link to="/" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Home</Link>
            <Link to="/contact" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Contact</Link>
            <Link to="/login" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Login</Link>
            <Link to="/signup" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Signup</Link>
            <Link to="/rooms" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Find Rooms</Link>
            <Link to="/chat" className="block py-2 px-4 hover:bg-blue-500 rounded transition">Chat</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
