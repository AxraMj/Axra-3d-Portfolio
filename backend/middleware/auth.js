const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({ message: 'Token verification failed, access denied' });
    }

    req.admin = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token, access denied' });
  }
};

module.exports = auth; 