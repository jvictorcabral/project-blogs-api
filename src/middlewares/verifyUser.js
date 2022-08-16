const jwt = require('jsonwebtoken');
const { User, BlogPost } = require('../database/models');

const SECRET = process.env.JWT_SECRET;
const errorMessage = { message: 'Unauthorized user' };

const verifyUser = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const { id } = req.params;
    const decoded = jwt.verify(auth, SECRET);
    console.log('decoded: ', decoded);

    const getUser = await User.findOne({
      where: { email: decoded.email },
    });

    const getPost = await BlogPost.findByPk(id);

    if (getUser.id !== getPost.userId) {
      throw (errorMessage);
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
  next();
};

module.exports = verifyUser;