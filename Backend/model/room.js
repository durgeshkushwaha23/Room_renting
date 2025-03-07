import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rentDuration: {
    type: String,
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
  },
  rules: {
    noSmoking: {
      type: Boolean,
      default: false,
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    // Add more rules as needed
  },
  photos: [
    {
      type: String,
    },
  ],
  videos: [
    {
      type: String,
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [reviewSchema],
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

export default Room;