const router = require('express').Router();
const { createPost, getPosts } = require('../controllers/posts');
const { validatePost } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.get('/', getPosts);

router.post('/', auth, validatePost, createPost);

module.exports = router;