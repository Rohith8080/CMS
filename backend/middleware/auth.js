const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied. Admin rights required.' });
  }
  next();
};

const validateRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return null;
  }
};

module.exports = { verifyToken, verifyAdmin, validateRefreshToken };
