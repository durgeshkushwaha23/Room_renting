import React, { useState } from "react";

const dummyRooms = [
  {
    id: 1,
    title: "Cozy Studio Apartment",
    description: "A beautiful and fully furnished studio apartment in a prime location.",
    price: "₹12,000/month",
    location: "Mumbai, Maharashtra",
    amenities: ["WiFi", "AC", "Parking"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    title: "Spacious 2BHK Flat",
    description: "Perfect for families. Includes a kitchen, balcony, and 24/7 security.",
    price: "₹18,500/month",
    location: "Bangalore, Karnataka",
    amenities: ["Gym", "Swimming Pool", "Security"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    title: "Luxury PG for Students",
    description: "PG with all modern facilities including food, WiFi, and housekeeping.",
    price: "₹8,000/month",
    location: "Delhi, India",
    amenities: ["Food", "WiFi", "Laundry"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    title: "1BHK Apartment in Pune",
    description: "Semi-furnished, near metro station, and has a great city view.",
    price: "₹15,000/month",
    location: "Pune, Maharashtra",
    amenities: ["Metro Nearby", "Balcony", "Furnished"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const FindRoom = () => {
  const [search, setSearch] = useState("");

  const filteredRooms = dummyRooms.filter((room) =>
    room.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Find Your Perfect Room</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border rounded-lg shadow-md focus:outline-none"
        />
      </div>

      {/* Room Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={room.image} alt={room.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{room.title}</h2>
                <p className="text-gray-600">{room.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">{room.price}</p>
                <p className="text-sm text-gray-500">📍 {room.location}</p>
                <div className="mt-3">
                  {room.amenities.map((amenity, index) => (
                    <span key={index} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded mr-2">
                      {amenity}
                    </span>
                  ))}
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No rooms found for this location.</p>
        )}
      </div>
    </div>
  );
};

export default FindRoom;
