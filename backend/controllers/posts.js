const Post = require('../models/post');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');

const createPost = (req, res, next) => {
  const { message } = req.body;
  const ownerId = req.user.id;

  Post.create({ message, ownerId })
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        next(new BadRequestError('Datos de publicación inválidos'));
      } else {
        next(err);
      }
    });
};

const getPosts = (req, res, next) => {
  Post.findAll({
    include: [{ model: User, as: 'owner', attributes: ['email'] }],
    order: [['createdAt', 'DESC']]
  })
    .then((posts) => res.send(posts))
    .catch(next);
};

module.exports = {
  createPost,
  getPosts,
};