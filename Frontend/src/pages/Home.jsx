import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserPlus, FaHome, FaComments } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-blue-400 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Find Your Perfect Rental Room</h1>
        <p className="mt-4 text-lg">Browse & Connect with Verified Listings</p>

        {/* Search Bar */}
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by city, area, or price..."
            className="w-full max-w-lg px-4 py-2 rounded-l-lg text-gray-700"
          />
          <button className="bg-white text-blue-600 px-4 py-2 rounded-r-lg">
            <FaSearch size={20} />
          </button>
        </div>
      </div>

      {/* Feature Sections */}
      <div className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Find Rooms */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <FaHome size={40} className="text-blue-600 mx-auto" />
          <h3 className="text-xl font-bold mt-4">Explore Listings</h3>
          <p className="text-gray-600 mt-2">Find verified rooms that suit your needs.</p>
          <Link
            to="/findrooms"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Find Rooms
          </Link>
        </div>

        {/* Sign Up */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <FaUserPlus size={40} className="text-green-600 mx-auto" />
          <h3 className="text-xl font-bold mt-4">Join as a User or Owner</h3>
          <p className="text-gray-600 mt-2">Sign up and start your journey today.</p>
          <Link
            to="/signup"
            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Chat System */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <FaComments size={40} className="text-purple-600 mx-auto" />
          <h3 className="text-xl font-bold mt-4">Chat with Owners</h3>
          <p className="text-gray-600 mt-2">Connect instantly with room owners.</p>
          <Link
            to="/chat"
            className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Chat Now
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12 bg-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold">Start Your Rental Journey Today!</h2>
        <p className="text-gray-700 mt-2">Find a room, connect with owners, and move in hassle-free.</p>
        <div className="mt-6">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            to="/findrooms"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Browse Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
