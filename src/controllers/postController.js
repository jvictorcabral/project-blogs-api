const { BlogPost, Category, User } = require('../database/models');

const create = async (req, res) => {
  const { /*  title, content, */categoryIds } = req.body;

  const findId = categoryIds.map((id) => Category.findByPk(id));

  const awaitPromises = await Promise.all(findId);

  if (awaitPromises.includes(null)) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  // const post = await BlogPost.create(title, content);

  // return res.status(201).json(post);
};

const getAll = async (_req, res) => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  return res.status(200).json(posts);
};

module.exports = {
  create,
  getAll,
};