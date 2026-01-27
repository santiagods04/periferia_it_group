const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Post = sequelize.define('Post', {
  message: {
    type: DataTypes.STRING(280),
    allowNull: false,
    validate: {
      len: [10, 280]
    }
  }
});

Post.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
User.hasMany(Post, { foreignKey: 'ownerId' });

module.exports = Post;