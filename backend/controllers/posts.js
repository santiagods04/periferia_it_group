const Post = require('../models/post');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

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

const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { message } = req.body;
    const ownerId = req.user.id;

    const post = await Post.findByPk(postId);
    if (!post) throw new NotFoundError('Publicación no encontrada');

    if (String(post.ownerId) !== String(ownerId)) {
      throw new ForbiddenError('No tienes permiso para modificar esta publicación');
    }

    await post.update({ message });

    const updated = await Post.findByPk(postId, {
      include: [{ model: User, as: 'owner', attributes: ['email'] }],
    });

    res.send(updated);

  } catch (err) {
    next(err);
  }
};


module.exports = {
  createPost,
  getPosts,
  updatePost,
};