import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser ,logout } from '../Controllers/authController.js';

const router = Router();

// Local authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',logout)






// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to frontend with token
    const token = req.user.generateToken();
    res.send("done")
    res.redirect(`http://localhost:5173/auth/google/callback?token=${token}`);
  });

export default router;