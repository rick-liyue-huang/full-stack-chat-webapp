
const express = require('express');
const router = express.Router();
const {Likes} = require('../models');
const {validateTokens} = require("../middlewares/AuthMiddleware");

router.post('/', validateTokens, async (req, res) => {
	const {PostId} = req.body;
	// confirm from middlewares
	const UserId = req.user.id;

	// check 'like' is exist or not, to toggle the 'like'
	const found = await Likes.findOne({where: {PostId: PostId, UserId: UserId}});
	if (!found) {
		await Likes.create({PostId: PostId, UserId: UserId});
		res.json({liked: true});
	} else {
		await Likes.destroy({where: {PostId: PostId, UserId: UserId}})
		res.json({liked: false});
	}
})

module.exports = router;
