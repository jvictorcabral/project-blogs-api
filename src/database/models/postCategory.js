const BlogPost = require("./blogPost");
const Category = require("./category");

const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    }
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      as: 'category',
      through: 'PostCategory',
    });

    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'CategoryId',
      as: 'post',
      through: 'PostCategory',
    });
  }  

  return PostCategory;
}

module.exports = PostCategory;