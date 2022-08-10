const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(auth, SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = validateToken;