import Room from '../model/room.js';
import cloudinary from '../Config/cloudinaryConfig.js';




export async function createRoom(req, res) {
  try {
    console.log('Received files:', req.files);
    console.log('Received body:', req.body);

    const { title, description, price, rentDuration } = req.body;
    const location = {
      city: req.body['location.city'],
      area: req.body['location.area'],
      pinCode: req.body['location.pinCode'],
      fullAddress: req.body['location.fullAddress'],
    };
    const rules = {
      noSmoking: req.body['rules.noSmoking'] === 'true',
      petsAllowed: req.body['rules.petsAllowed'] === 'true',
    };
    const owner = req.user._id; // Assuming the user is authenticated

    // Check for duplicate room
    const existingRoom = await Room.findOne({
      title,
      description,
      price,
      'location.fullAddress': location.fullAddress,
    });

    if (existingRoom) {
      return res.status(400).json({ message: 'Room with the same details already exists' });
    }

    // Upload Photos to Cloudinary
    const photos = [];
    if (req.files?.photos) {
      for (const file of req.files.photos) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) {
                console.error('Cloudinary upload error (photo):', error);
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

    // Upload Videos to Cloudinary
    const videos = [];
    if (req.files?.videos) {
      for (const file of req.files.videos) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
              if (error) {
                console.error('Cloudinary upload error (video):', error);
                reject(error);
              } else {
                resolve(result);
              }
            }).end(file.buffer);
          });
          videos.push(result.secure_url);
        } catch (error) {
          console.error('Error uploading video to Cloudinary:', error);
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
      videos,
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
  try {
    const { id } = req.params;
    const { title, description, price, rentDuration } = req.body;
    const location = {
      city: req.body['location.city'],
      area: req.body['location.area'],
      pinCode: req.body['location.pinCode'],
      fullAddress: req.body['location.fullAddress'],
    };
    const rules = {
      noSmoking: req.body['rules.noSmoking'] === 'true',
      petsAllowed: req.body['rules.petsAllowed'] === 'true',
    };

    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Update room details
    room.title = title;
    room.description = description;
    room.price = price;
    room.rentDuration = rentDuration;
    room.location = location;
    room.rules = rules;

    // Upload new photos to Cloudinary
    if (req.files?.photos) {
      const photos = [];
      for (const file of req.files.photos) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) {
                console.error('Cloudinary upload error (photo):', error);
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
      room.photos = photos;
    }

    // Upload new videos to Cloudinary
    if (req.files?.videos) {
      const videos = [];
      for (const file of req.files.videos) {
        try {
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
              if (error) {
                console.error('Cloudinary upload error (video):', error);
                reject(error);
              } else {
                resolve(result);
              }
            }).end(file.buffer);
          });
          videos.push(result.secure_url);
        } catch (error) {
          console.error('Error uploading video to Cloudinary:', error);
        }
      }
      room.videos = videos;
    }

    await room.save();

    res.status(200).json({ message: 'Room updated successfully', room });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}




export async function deleteRoom(req, res) {
  try {
    const { id } = req.params;
    console.log("Deleting room with ID:", id);

    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await Room.deleteOne({ _id: id });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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





export async function getUserRooms(req, res) {
  try {
    const userId = req.user._id;
    const rooms = await Room.find({ owner: userId });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}



export async function getRoomById(req, res) {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
