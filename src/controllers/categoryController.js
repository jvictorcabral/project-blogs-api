const { Category } = require('../database/models');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
  
    const category = await Category.create({ name });
  
    return res.status(201).json(category);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createCategory,
};