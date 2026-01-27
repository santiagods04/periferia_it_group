const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET = 'dev-secret' } = process.env;

const signToken = (userId) => jwt.sign(
  { id: userId },
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  { expiresIn: '7d' }
);

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => res.send({ token: signToken(user.id) }))
    .catch(next);
};


const getCurrentUser = (req, res, next) => {
  User.findByPk(req.user.id)
    .orFail(() => {
      throw new NotFoundError('No se encontró un usuario con ese ID');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  login,
};