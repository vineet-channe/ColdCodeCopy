const express = require('express');
const router = express.Router();
const { createPost,deletePost,addComment,fetchPostsByCommunity } = require('../controllers/communityController');

router.get('/getpost', fetchPostsByCommunity);

router.post('/post',createPost);

router.delete('/post/:id',deletePost);

router.post('/post/:id/comment',addComment);

module.exports = router;
