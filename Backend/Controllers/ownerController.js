import Room from '../model/room.js';

export async function createRoom(req, res) {
  try {
    const { title, description, price, rentDuration, location, rules, photos, videos } = req.body;
    const owner = req.user._id; // Assuming the user is authenticated and the user ID is available in req.user

    const newRoom = new Room({
      title,
      description,
      price,
      rentDuration,
      location,
      rules,
      photos,
      videos,
      owner,
    });

    await newRoom.save();

    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}