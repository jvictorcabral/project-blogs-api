const { BlogPost } = require('../database/models');

const validateNonexistentPost = async (req, res, next) => {
  const { id } = req.params;

  const post = await BlogPost.findByPk(id);
  
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  next();
};

module.exports = validateNonexistentPost;