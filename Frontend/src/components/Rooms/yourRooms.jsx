import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../../index.css";
import { toast } from "react-toastify";

const YourRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filter, setFilter] = useState("latest");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/rooms/user-rooms", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(res.data);
        setFilteredRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Handle sorting when filter changes
  useEffect(() => {
    let sortedRooms = [...rooms];
    if (filter === "latest") {
      sortedRooms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      sortedRooms.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    setFilteredRooms(sortedRooms);
  }, [filter, rooms]);

  const handleCreateRoom = () => {
    navigate("/create-room");
  };

  const handleEditRoom = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteRoom = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized: Please log in.");
        return;
      }

      const response = await axios.delete(`/rooms/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setRooms(rooms.filter((room) => room._id !== id));
        toast.success("Room deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting room:", error.response?.data || error);
      toast.error("Error deleting room. Please try again.");
    }
  };

  return (
    <>
      {/* Header Section: Create Room & Filter */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-50 shadow-md">
        <button
          onClick={handleCreateRoom}
          className="bg-green-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-800 transition duration-300"
        >
          + Create New Room
        </button>

        <select
          className="bg-white px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Rooms List */}
      <div className="grid px-6 py-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl"
            >
              {/* Swiper for Image & Video */}
              {(room.photos.length > 0 || room.videos.length > 0) && (
                <Swiper navigation={true} modules={[Navigation]} className="w-full h-64">
                  {room.photos?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} alt={`Room ${index}`} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                  {room.videos?.map((vid, index) => (
                    <SwiperSlide key={index}>
                      <video controls className="w-full h-full object-cover">
                        <source src={vid} type="video/mp4" />
                      </video>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* Room Details */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">{room.title}</h2>
                <p className="text-gray-600 mt-1">{room.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-3">₹{room.price}/month</p>
                <p className="text-small text-zinc-600 ">{room.rentDuration} months,(rent duration)</p>

                <p className="text-sm text-gray-500">📍 {room.location?.fullAddress}</p>

                {/* Rules */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {room.rules?.noSmoking && (
                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                      🚭 No Smoking
                    </span>
                  )}
                  {room.rules?.petsAllowed && (
                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                      🐶 Pets Allowed
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => handleEditRoom(room._id)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room._id)}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No rooms found.</p>
        )}
      </div>
    </>
  );
};

export default YourRooms;
