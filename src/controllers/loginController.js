const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res
        .status(400)
        .json({ message: 'Invalid fields' });
    }

    const token = jwt.sign({ email, password }, SECRET);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  login,
};