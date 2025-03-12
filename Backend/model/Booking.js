import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  budgetRange: { type: String, required: true },
  roomType: { type: String, required: true },
  moveInDate: { type: Date, required: true },
  stayDuration: { type: Number, required: true },
  specialRequirements: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;