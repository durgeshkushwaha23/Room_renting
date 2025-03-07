// filepath: c:\Users\HP\Desktop\Renting_Room\Backend\model\user.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phone: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default: "default-avatar.png",
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, 'your_jwt_secret', {
    expiresIn: '1h'
  });
};

const User = mongoose.model('User', userSchema);

export default User;