// filepath: c:\Users\HP\Desktop\room_rent\Backend\Controllers\ownerController.js
import Room from '../model/room.js';
import cloudinary from '../Config/cloudinaryConfig.js';


export async function createRoom(req, res) {
  try {
    console.log('Received files:', req.file);

    const { title, description, price, rentDuration, location, rules } = req.body;
    const owner = req.user._id; // Assuming the user is authenticated and the user ID is available in req.user

    // Check for duplicate room
    const existingRoom = await Room.findOne({ title, description, price, 'location.fullAddress': location.fullAddress });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room with the same details already exists' });
    }

    const photos = [];
    if (req.files && req.files['photos']) {
      for (const file of req.files['photos']) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                resolve(result);
              }
            }).end(file.buffer);
          });
          photos.push(result.secure_url);
        } catch (error) {
          console.error('Error uploading photo to Cloudinary:', error);
        }
      }
    }

    const newRoom = new Room({
      title,
      description,
      price,
      rentDuration,
      location,
      rules,
      photos,
      owner,
    });

    await newRoom.save();

    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export async function editRoom(req, res) {
  const { id } = req.params;
  const { title, description, price, rentDuration, location, rules } = req.body;

  try {
    const photos = [];
    if (req.files && req.files['photos']) {
      for (const file of req.files['photos']) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                resolve(result);
              }
            }).end(file.buffer);
          });
          photos.push(result.secure_url);
        } catch (error) {
          console.error('Error uploading photo to Cloudinary:', error);
        }
      }
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { title, description, price, rentDuration, location, rules, photos },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


export async function deleteRoom(req, res) {
  const { id } = req.params;

  try {
    const deletedRoom = await Room.findByIdAndDelete(id);

    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export async function getAllRooms(req, res) {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
} 