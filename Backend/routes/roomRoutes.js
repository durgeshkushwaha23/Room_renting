import { Router } from 'express';
import { createRoom } from '../Controllers/ownerController.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// Route to create a room (only accessible by admin)
router.post('/create', isAuthenticated, isAdmin, createRoom);

export default router;