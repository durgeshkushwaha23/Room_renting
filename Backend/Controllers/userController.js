import User from '../model/user.js';
import Room from '../model/room.js';
import cloudinary from "../Config/cloudinaryConfig.js";

export async function updateProfile(req, res) {
  try {
    const { fullName, email, phone } = req.body;
    const userId = req.user._id; // Ensure req.user exists and contains _id

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, email, phone }, // Removed profilePic
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


export async function createReview(req, res) {
  const { roomId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user._id; // Assuming the user is authenticated and the user ID is available in req.user

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const review = {
      user: userId,
      rating,
      comment,
      createdAt: new Date(),
    };

    room.reviews.push(review);
    await room.save();

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export async function getRoomReviews(req, res) {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId).populate('reviews.user', 'fullName profilePic');

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json(room.reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}