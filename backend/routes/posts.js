const router = require('express').Router();
const { createPost, getPosts, updatePost } = require('../controllers/posts');
const { validatePost, validatePostId } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.get('/', getPosts);

router.post('/', auth, validatePost, createPost);
router.patch('/:postId', auth, validatePostId, validatePost, updatePost);

module.exports = router;