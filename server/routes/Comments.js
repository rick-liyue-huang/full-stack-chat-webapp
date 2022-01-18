
const express = require('express');
const router = express.Router();
const {Comments} = require('../models');
const {validateTokens} = require('../middlewares/AuthMiddleware')

router.get('/:postId', async (req, res) => {
	const postId = req.params.postId;
	const comments = await Comments.findAll({where: {PostId: postId}});
	res.json(comments);
});

router.post('/', validateTokens, async (req, res) => {
	const comment = req.body;
	// come from validateTokens middleware
	const username = req.user.username;
	comment.username = username;
	await Comments.create(comment);
	res.json(comment);
})

module.exports = router;
