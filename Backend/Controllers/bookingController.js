import Booking from '../model/Booking.js';

export async function createBooking(req, res) {
  try {
    const { fullName, email, phone, budgetRange, roomType, moveInDate, stayDuration, specialRequirements } = req.body;
    const user = req.user._id; // Assuming the user is authenticated

    const newBooking = new Booking({
      fullName,
      email,
      phone,
      budgetRange,
      roomType,
      moveInDate,
      stayDuration,
      specialRequirements,
      user,
    });

    await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}