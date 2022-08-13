const { BlogPost, Category, User, PostCategory } = require('../database/models');

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

const getById = async (req, res) => {
  const { id } = req.params;

  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
    const { id } = req.params;

    await BlogPost.update(
      { title, content },
      { where: { id } },
    );

    const result = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });

    return res.status(200).json(result);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  await PostCategory.destroy(
    { where: { postId: id } },
  );
  await BlogPost.destroy(
    { where: { id } },
  );

  return res.status(204);
};

module.exports = {
  create,
  getAll,
  getById,
  deletePost,
  updatePost,
};