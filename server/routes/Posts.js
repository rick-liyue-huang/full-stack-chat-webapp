const express = require('express');
const router = express.Router();
const {Posts, Likes} = require('../models');

const {validateTokens} = require('../middlewares/AuthMiddleware');

router.get('/', validateTokens, async (req, res) => {
	const listOfPosts = await Posts.findAll({include: [Likes]});

	// confirm its logined or not
	const likedPosts = await Likes.findAll(({where: {UserId: req.user.id}}));

	res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});

router.post('/', validateTokens, async (req, res) => {
	const post = req.body;
	post.username = req.user.username;
	// connect to database and create table data
	await Posts.create(post);
	res.json(post);
});

router.get('/byId/:id', async (req, res) => {
	const id = req.params.id;
	const post  = await Posts.findByPk(id);
	res.json(post);
});

router.delete('/:postId', validateTokens, async (req, res) => {
	const postId = req.params.postId;
	await Posts.destroy({where: {id: postId}});
	res.json('deleted posts')
})


module.exports = router;
