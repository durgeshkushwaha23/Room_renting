import { Router } from 'express';
import { updateProfile, createReview, getRoomReviews } from '../Controllers/userController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = Router();

// Route to update user profile
router.put('/update-profile', isAuthenticated, updateProfile);

// Route to create a review for a room
router.post('/reviews/:roomId', isAuthenticated, createReview);

// Route to get reviews for a room (accessible by authenticated users)
router.get('/reviews/:roomId', isAuthenticated, getRoomReviews);

export default router;