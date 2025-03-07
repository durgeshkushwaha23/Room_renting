// filepath: c:\Users\HP\Desktop\room_rent\Backend\routes\roomRoutes.js
import { Router } from 'express';
import { createRoom, editRoom, deleteRoom, getAllRooms } from '../Controllers/ownerController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = Router();

// Route to create a room (only accessible by admin)
router.post('/create', isAuthenticated, isAdmin, upload.fields([{ name: 'photos', maxCount: 10 }]), createRoom);

// Route to edit a room (only accessible by admin)
router.put('/edit/:id', isAuthenticated, isAdmin, upload.fields([{ name: 'photos', maxCount: 10 }]), editRoom);

// Route to delete a room (only accessible by admin)
router.delete('/delete/:id', isAuthenticated, isAdmin, deleteRoom);

// Route to get all rooms (accessible by authenticated users)
router.get('/all', isAuthenticated, getAllRooms);

export default router; 