import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
const app = express();
import authRoutes from "./routes/auth.js"
import roomRoutes from "./routes/roomRoutes.js"

import session from 'express-session';
import cors from "cors"
import passport from 'passport';
import './Config/passportConfig.js'; // Ensure this is imported to initialize Passport

dotenv.config()
connectDB();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));


// Middleware to parse JSON bodies
app.use(express.json());

// Set up session middleware
app.use(session({
    secret: 'yetokuchalaghai', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));
  
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//auth routes
app.use("/api/auth", authRoutes);

//room routes
app.use("/api/rooms", roomRoutes);






const port = process.env.PORT
app.listen(port || 5000, (req,res)=>{
    console.log(`server is running om ${port}`);
})

