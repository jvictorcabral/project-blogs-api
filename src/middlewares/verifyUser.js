const jwt = require('jsonwebtoken');
const { User, BlogPost } = require('../database/models');

const SECRET = process.env.JWT_SECRET;
const errorMessage = { message: 'Unauthorized user' };

const verifyUser = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const { id: userId } = req.params;
    const decoded = jwt.verify(auth, SECRET);
    // const getEmail = decoded.email;

    const getUser = await User.findOne({
      where: { email: decoded.email },
    });

    const getUserId = await BlogPost.findOne({
      where: { id: userId },
    });
    console.log(decoded.email);
    console.log(getUser);
    console.log(getUserId);

    if (getUser.id !== getUserId.userId) {
      throw (errorMessage);
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
  next();
};

module.exports = verifyUser;