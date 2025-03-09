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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/rooms/user-rooms", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

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
      {/* Create Room Button & Filter */}
      <div className="flex justify-between px-4 items-center p-4">
        <button
          onClick={handleCreateRoom}
          className="bg-green-700 text-white px-4 py-2 rounded-md shadow-lg hover:bg-green-800 transition"
        >
          Create New Room
        </button>

        <select className="bg-gray-100 px-4 py-2 rounded-md border border-gray-300">
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Rooms List */}
      <div className="grid px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Swiper for Image & Video */}
              {(room.photos.length > 0 || room.videos.length > 0) && (
                <Swiper navigation={true} modules={[Navigation]} className="w-full h-56">
                  {room.photos?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} alt={`Room ${index}`} className="w-full h-full object-cover rounded-t-lg" />
                    </SwiperSlide>
                  ))}
                  {room.videos?.map((vid, index) => (
                    <SwiperSlide key={index}>
                      <video controls className="w-full h-full object-cover rounded-t-lg">
                        <source src={vid} type="video/mp4" />
                      </video>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {/* Room Details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{room.title}</h2>
                <p className="text-gray-600">{room.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">₹{room.price}</p>
                <p className="text-sm text-gray-500">📍 {room.location?.fullAddress}</p>

                {/* Rules */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {room.rules?.noSmoking && (
                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                      No Smoking
                    </span>
                  )}
                  {room.rules?.petsAllowed && (
                    <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded">
                      Pets Allowed
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleEditRoom(room._id)}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room._id)}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No rooms found.</p>
        )}
      </div>
    </>
  );
};

export default YourRooms;