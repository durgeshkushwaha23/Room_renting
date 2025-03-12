import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const FindRoom = () => {
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [sortPrice, setSortPrice] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/rooms/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        let rooms = res.data;

        // Extract unique cities and areas from API data
        const uniqueCities = [
          ...new Set(rooms.map((room) => room.location?.city).filter(Boolean)),
        ];
        const uniqueAreas = [
          ...new Set(rooms.map((room) => room.location?.area).filter(Boolean)),
        ];
        setCities(uniqueCities);
        setAreas(uniqueAreas);

        // Filter by City
        if (selectedCity) {
          rooms = rooms.filter((room) => room.location?.city === selectedCity);
        }

        // Filter by Area
        if (selectedArea) {
          rooms = rooms.filter((room) => room.location?.area === selectedArea);
        }

        // Sort by Date
        if (sortBy === "latest") {
          rooms = rooms.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (sortBy === "oldest") {
          rooms = rooms.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
        }

        // Sort by Price
        if (sortPrice) {
          rooms = rooms.sort((a, b) => a.price - b.price);
        }

        setFilteredRooms(rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, [selectedCity, selectedArea, sortBy, sortPrice]);

  
  const Navigate =  useNavigate();

  const bookingHandler = () => {
    Navigate("/booking");
  };

  return (
    <>
      <div className="flex gap-4 p-6">
        <select
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSelectedArea(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Area</option>
          {areas.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

        <button
          onClick={() => setSortPrice(!sortPrice)}
          className="border p-2 rounded"
        >
          Sort by Price {sortPrice ? "⬆️" : "⬇️"}
        </button>
      </div>

      <div className="grid px-6 py-6  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              className="bg-white min-h-64 rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl"
            >
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="w-full h-64"
              >
                {room.photos?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`Room ${index}`}
                      className="w-full h-full object-cover"
                    />
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

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {room.title}
                </h2>
                <p className="text-gray-600 mt-1">{room.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-3">
                  ₹{room.price}/month
                </p>
                <p className="text-sm text-gray-500">
                  📍 {room.location?.fullAddress}
                </p>
              </div>
              <div className="flex items-center justify-between px-8">
                <button className="px-3 py-1 mb-4 rounded-md bg-blue-400">
                  view more
                </button>
                <button
                  onClick={bookingHandler}
                  className="px-3 py-1 mb-4 rounded-md bg-green-500"
                >
                  Book now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No rooms found.
          </p>
        )}
      </div>
    </>
  );
};

export default FindRoom;
