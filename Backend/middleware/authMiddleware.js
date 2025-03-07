import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export function isAuthenticated(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.your_jwt_secret, async (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden: Admins only' });
}