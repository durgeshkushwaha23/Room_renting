import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditRoom = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rentDuration: "",
    location: {
      city: "",
      area: "",
      pinCode: "",
      fullAddress: "",
    },
    rules: {
      noSmoking: false,
      petsAllowed: false,
    },
    photos: [],
    videos: [], // Add videos to formData
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/rooms/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching room:", error);
      }
    };

    fetchRoom();
  }, [id]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [locationField]: value,
        },
      }));
    } else if (name.startsWith("rules.")) {
      const rulesField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        rules: {
          ...prevData.rules,
          [rulesField]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const onFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "photos" || key === "videos") {
        for (let i = 0; i < formData[key].length; i++) {
          formDataToSend.append(key, formData[key][i]);
        }
      } else if (key === "location" || key === "rules") {
        for (const subKey in formData[key]) {
          formDataToSend.append(`${key}.${subKey}`, formData[key][subKey]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await axios.put(`/rooms/edit/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        },
      });
      toast.success("Room updated successfully!");
      navigate("/yourrooms");
    } catch (error) {
      toast.error("Error updating room. Please try again.");
      console.error("Error updating room:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Edit Room
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Title"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Description"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            placeholder="Price"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="rentDuration"
            value={formData.rentDuration}
            onChange={onChange}
            placeholder="Rent Duration"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

          <h3 className="text-lg font-semibold">Location</h3>
          <input
            type="text"
            name="location.city"
            value={formData.location.city}
            onChange={onChange}
            placeholder="City"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="location.area"
            value={formData.location.area}
            onChange={onChange}
            placeholder="Area"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="location.pinCode"
            value={formData.location.pinCode}
            onChange={onChange}
            placeholder="Pin Code"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="location.fullAddress"
            value={formData.location.fullAddress}
            onChange={onChange}
            placeholder="Full Address"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

          <h3 className="text-lg font-semibold">Rules</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rules.noSmoking"
              checked={formData.rules.noSmoking}
              onChange={onChange}
              className="mr-2"
            />
            No Smoking
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rules.petsAllowed"
              checked={formData.rules.petsAllowed}
              onChange={onChange}
              className="mr-2"
            />
            Pets Allowed
          </label>

          <h3 className="text-lg font-semibold">Photos</h3>
          <input
            type="file"
            name="photos"
            onChange={onFileChange}
            multiple
            accept="image/*"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

          <h3 className="text-lg font-semibold">Videos</h3>
          <input
            type="file"
            name="videos"
            onChange={onFileChange}
            multiple
            accept="video/*"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;