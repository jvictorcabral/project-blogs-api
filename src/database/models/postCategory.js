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
    }, {
      timestamps: false 
    });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      as: 'categories',
      through: 'PostCategory',
    });

    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      as: 'post',
      through: 'PostCategory',
    });
  }

  return PostCategory;
}

module.exports = PostCategory;