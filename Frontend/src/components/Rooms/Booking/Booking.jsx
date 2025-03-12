import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '../../../axios/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define validation schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone Number is required'),
  budgetRange: yup.string().required('Budget Range is required'),
  roomType: yup.string().required('Room Type is required'),
  moveInDate: yup.date().required('Preferred Move-in Date is required'),
  stayDuration: yup.number().required('Minimum Stay Duration is required').positive().integer(),
  specialRequirements: yup.string(),
});

const Booking = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('/rooms/user-bookings', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Booking successful!');
      navigate('/YourBooking');
    } catch (error) {
      toast.error('Error creating booking. Please try again.');
      console.error('Error creating booking:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Book a Room</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              {...register('fullName')}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              {...register('email')}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              {...register('phone')}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div>
            <input
              type="text"
              name="budgetRange"
              placeholder="Budget Range"
              {...register('budgetRange')}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.budgetRange && <p className="text-red-500 text-sm">{errors.budgetRange.message}</p>}
          </div>
          <div>
            <input
              type="text"
              name="roomType"
              placeholder="Room Type"
              {...register('roomType')}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.roomType && <p className="text-red-500 text-sm">{errors.roomType.message}</p>}
          </div>
          <div>
            <input
              type="date"
              name="moveInDate"
              placeholder="Preferred Move-in Date"
              {...register('moveInDate')}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.moveInDate && <p className="text-red-500 text-sm">{errors.moveInDate.message}</p>}
          </div>
          <div>
            <input
              type="number"
              name="stayDuration"
              placeholder="Minimum Stay Duration (Months)"
              {...register('stayDuration')}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
            {errors.stayDuration && <p className="text-red-500 text-sm">{errors.stayDuration.message}</p>}
          </div>
          <div>
            <textarea
              name="specialRequirements"
              placeholder="Any Special Requirements (Accessibility, Pets, etc.)"
              {...register('specialRequirements')}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;