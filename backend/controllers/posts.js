const Post = require('../models/post');
const BadRequestError = require('../errors/BadRequestError');

const createPost = (req, res, next) => {
  const { message } = req.body;
  const owner = req.user._id;

  Post.create({ message, owner })
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Datos de publicación inválidos'));
      } else {
        next(err);
      }
    });
};

const getPosts = (req, res, next) => {
  Post.find({})
    .populate('owner')
    .sort({ createdAt: -1 })
    .then((posts) => res.send(posts))
    .catch(next);
};

module.exports = {
  createPost,
  getPosts,
};