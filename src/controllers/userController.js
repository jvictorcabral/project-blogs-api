const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({ message: 'User already registered' });
    }    

    await User.create({ displayName, email, password, image });
    const token = jwt.sign({ displayName, email, password, image }, SECRET);

    return res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createUser,
};