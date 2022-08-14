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

const listAllUsers = async (_req, res) => {
  // consegui remover a senha olhando na documentacao do Sequelize
  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return res.status(200).json(users);
};

const listUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const auth = req.headers.authorization;
  const decoded = jwt.verify(auth, SECRET);
  const getEmail = decoded.email;
  
  const getUser = await User.findOne({
    where: { email: getEmail },
  });
  
  const test = await User.destroy({
    where: { id: getUser.id },
  });

  console.log(test);

  res.status(204).end();
};

module.exports = {
  createUser,
  listAllUsers,
  listUser,
  deleteUser,
};