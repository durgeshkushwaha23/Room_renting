import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define validation schema using Yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  description: yup.string().required("Description is required").min(10, "Description should be at least 10 characters"),
  price: yup.number().typeError("Price must be a number").positive("Price must be positive").required("Price is required"),
  rentDuration: yup.string().required("Rent duration is required"),
  location: yup.object().shape({
    city: yup.string().required("City is required"),
    area: yup.string().required("Area is required"),
    pinCode: yup.string().matches(/^\d{6}$/, "Pin Code must be 6 digits").required("Pin Code is required"),
    fullAddress: yup.string().required("Full address is required"),
  }),
  rules: yup.object().shape({
    noSmoking: yup.boolean(),
    petsAllowed: yup.boolean(),
  }),
  photos: yup
    .mixed()
    .test("fileType", "Only images (JPG, PNG) are allowed", (files) => {
      if (!files.length) return true;
      return Array.from(files).every((file) => file.type.startsWith("image/"));
    })
    .test("fileSize", "Each image must be under 2MB", (files) => {
      if (!files.length) return true;
      return Array.from(files).every((file) => file.size <= 2 * 1024 * 1024);
    }),
  videos: yup
    .mixed()
    .test("fileType", "Only videos (MP4) are allowed", (files) => {
      if (!files.length) return true;
      return Array.from(files).every((file) => file.type === "video/mp4");
    })
    .test("fileSize", "Each video must be under 10MB", (files) => {
      if (!files.length) return true;
      return Array.from(files).every((file) => file.size <= 10 * 1024 * 1024);
    }),
});

const CreateRoom = () => {
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rules: {
        noSmoking: false,
        petsAllowed: false,
      },
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    // Convert rules from boolean to true/false strings (optional)
    data.rules.noSmoking = data.rules.noSmoking ? true : false;
    data.rules.petsAllowed = data.rules.petsAllowed ? true : false;

    // Create FormData for file upload
    const formDataToSend = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "photos" || key === "videos") {
        Array.from(data[key]).forEach((file) => {
          formDataToSend.append(key, file);
        });
      } else if (typeof data[key] === "object") {
        Object.keys(data[key]).forEach((subKey) => {
          formDataToSend.append(`${key}.${subKey}`, data[key][subKey]);
        });
      } else {
        formDataToSend.append(key, data[key]);
      }
    });

    try {
      await axios.post("/rooms/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Room created successfully!");
      navigate("/yourrooms");
    } catch (error) {
      toast.error("Error creating room. Please try again.");
      console.error("Error creating room:", error);
    }
  };

  return (
    <>
      <button onClick={() => navigate("/yourrooms")} className="px-2 py-1 rounded-md bg-red-500 text-white ml-4">
        Back
      </button>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Create New Room</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <input {...register("title")} placeholder="Title" className="w-full px-4 py-2 border rounded-lg" />
            <p className="text-red-500">{errors.title?.message}</p>

            {/* Description */}
            <textarea {...register("description")} placeholder="Description about room" className="w-full px-4 py-2 border rounded-lg" />
            <p className="text-red-500">{errors.description?.message}</p>

            {/* Price & Rent Duration */}
            <input {...register("price")} type="number" placeholder="Price in rs" className="w-full px-4 py-2 border rounded-lg" />
            <p className="text-red-500">{errors.price?.message}</p>

            <input {...register("rentDuration")} type="number" placeholder="Rent Duration in months" className="w-full px-4 py-2 border rounded-lg" />
            <p className="text-red-500">{errors.rentDuration?.message}</p>

            {/* Location */}
            <h3 className="text-lg font-semibold">Location</h3>
            <input {...register("location.city")} placeholder="City" className="w-full px-4 py-2 border rounded-lg" />
            <p className="text-red-500">{errors.location?.city?.message}</p>

            <input {...register("location.area")} placeholder="Area" className="w-full px-4 py-2 border rounded-lg" />
            <p className="text-red-500">{errors.location?.area?.message}</p>

            <input {...register("location.pinCode")} placeholder="Pin Code" className="w-full px-4 py-2 border rounded-lg" />
            <p className="text-red-500">{errors.location?.pinCode?.message}</p>

            <input {...register("location.fullAddress")} placeholder="Full Address" className="w-full px-4 py-2 border rounded-lg" />
            <p className="text-red-500">{errors.location?.fullAddress?.message}</p>

            {/* Rules */}
            <h3 className="text-lg font-semibold">Rules</h3>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="checkbox" {...register("rules.noSmoking")} className="mr-2" />
                No Smoking
              </label>
              <label className="flex items-center">
                <input type="checkbox" {...register("rules.petsAllowed")} className="mr-2" />
                Pets Allowed
              </label>
            </div>

            {/* File Upload */}
            <h3 className="text-lg font-semibold">Photos</h3>
            <input type="file" {...register("photos")} multiple accept="image/*" />
            <p className="text-red-500">{errors.photos?.message}</p>

            <h3 className="text-lg font-semibold">Videos</h3>
            <input type="file" {...register("videos")} multiple accept="video/mp4" />
            <p className="text-red-500">{errors.videos?.message}</p>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Create Room
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
