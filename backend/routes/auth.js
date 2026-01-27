const router = require('express').Router();
const { login } = require('../controllers/users');
const { validateLogin } = require('../middlewares/validation');

router.post('/signin', validateLogin, login);

module.exports = router;