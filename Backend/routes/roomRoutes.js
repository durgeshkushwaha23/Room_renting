// filepath: c:\Users\HP\Desktop\room_rent\Backend\routes\roomRoutes.js
import { Router } from 'express';
import { createRoom, editRoom, deleteRoom, getAllRooms,getUserRooms ,getRoomById} from '../Controllers/ownerController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = Router();

// Route to create a room (only accessible by admin)
router.post('/create', isAuthenticated, isAdmin, upload.fields([{ name: 'photos', maxCount: 10 }, { name: 'videos', maxCount: 5 }]), createRoom);

// Route to edit a room (only accessible by admin)
router.put('/edit/:id', isAuthenticated, isAdmin, upload.fields([{ name: 'photos', maxCount: 10 },{ name: 'videos', maxCount: 5 }]), editRoom);

// Route to delete a room (only accessible by admin)
router.delete('/delete/:id', isAuthenticated, isAdmin, deleteRoom);

// Route to get all rooms (accessible by authenticated users)
router.get('/all', isAuthenticated, getAllRooms);


// Route to get rooms created by the authenticated user
router.get('/user-rooms', isAuthenticated, getUserRooms);


// Route to get a single room by ID (accessible by authenticated users)
router.get('/:id', isAuthenticated, getRoomById);


export default router; 