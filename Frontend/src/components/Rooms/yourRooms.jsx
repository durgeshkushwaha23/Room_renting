import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../../index.css";


const YourRooms = () => {
  const rooms = [
    {
      id: 1,
      title: "Cozy Studio Apartment",
      description: "A beautiful and fully furnished studio apartment in a prime location.",
      price: "₹12,000/month",
      location: "Mumbai, Maharashtra",
      rules: ["noSmoking", "comes before 10pm"],
      image: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm9vbXxlbnwwfHwwfHx8MA%3D%3D"
      ],
      vido: [
        "https://media.istockphoto.com/id/1412708059/video/excited-asian-chinese-esports-game-host-streamer-online-live-streaming-hosting-in-game-room.mp4?s=mp4-640x640-is&k=20&c=bluKEREYnbqxES-okuNvMOG4gl4A0nS151fYBOHv-zw="
      ]
    },
    
  ];


  return (
    <>
      {/* Create Room Button */}
      <div className="flex justify-between px-15 items-center p-4">
        <button className="bg-green-700 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-800 transition">
          Create New Room
        </button>

        {/* Filter Dropdown */}
        <select className="bg-gray-100 px-4 p-5 py-2 rounded-md border border-gray-300">
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    <div className="grid px-11 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Swiper for Image & Video */}
            <Swiper navigation={true} modules={[Navigation]} className="w-full h-56">
              {room.image.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Room ${index}`} className="w-full h-full object-cover rounded-t-lg" />
                </SwiperSlide>
              ))}
              {room.vido.map((vid, index) => (
                <SwiperSlide key={index}>
                  <video controls className="w-full h-full object-cover rounded-t-lg">
                    <source src={vid} type="video/mp4" />
                  </video>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="p-4">
              <h2 className="text-xl font-semibold">{room.title}</h2>
              <p className="text-gray-600">{room.description}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">{room.price}</p>
              <p className="text-sm text-gray-500">📍 {room.location}</p>

              {/* Rules */}
              <div className="mt-3 flex flex-wrap gap-2">
                {room.rules.map((rule, index) => (
                  <span key={index} className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                    {rule}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-4 flex gap-4">
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  Edit
                </button>
                <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No rooms found for this location.</p>
      )}
    </div>
    </>
  );
};

export default YourRooms;
