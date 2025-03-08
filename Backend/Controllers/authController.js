import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function registerUser(req, res) {
  try {
    const { fullName, email, password, role, phone } = req.body;

    // Validate required fields based on role
    if (role === 'admin' && !phone) {
      return res.status(400).json({ message: 'Phone number is required for admin registration' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user & hash password (handled in model)
    const newUser = new User({ fullName, email, password, role, phone, isVerified: true });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export async function loginUser(req, res) {
 
  //   const { email, password } = req.body;

  //   // Check if the user exists
  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     return res.status(400).json({ message: 'Invalid email or password' });
  //   }

  //   // Check if the password is correct
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) {
  //     return res.status(400).json({ message: 'Invalid email or password' });
  //   }

  //   // Generate JWT token
  //   const token = jwt.sign({ id: user._id, role: user.role }, process.env.your_jwt_secret, {
  //     expiresIn: '10h'
  //   });

  //   res.status(200).json({ message: 'Login successful', token });
  // } catch (error) {
  //   res.status(500).json({ message: 'Server error', error: error.message });
  // }
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const isMatch =  bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.your_jwt_secret , { expiresIn: "7d" });

    // Debugging logs
    console.log("Login Successful!");
   

    // Send response
    res.json({ token, user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err.message });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};