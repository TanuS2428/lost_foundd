const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Usually token comes as "Bearer <token>"
    const extractedToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
