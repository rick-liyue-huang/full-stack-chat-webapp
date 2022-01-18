const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');
const {asign, sign} = require('jsonwebtoken');
const {validateTokens} = require("../middlewares/AuthMiddleware");

router.post('/', async (req, res) => {
	const {username, password} = req.body;

//	 using bcrypt to crypt the password
	bcrypt.hash(password, 10).then(hash => {
	//	 hash is the hashed password
		Users.create({
			username: username,
			password: hash,
		})
		res.json('success');
	})
});

router.post('/login', async (req, res) => {
	const {username, password} = req.body;
	const user = await Users.findOne({where: {username: username}});

	if (user)
		bcrypt.compare(password, user.password).then((match) => {
			if (!match)
				res.json({ error: 'Wrong Username and Password combination' });
			else {
				const accessToken = sign(
					{username: user.username, id: user.id},
					'importantsecret');
				res.json({token: accessToken, username: username, id: user.id});
			}
		});
	else{
		res.json({ error: "User doesn't exist"})
	}
});

router.get('/auth', validateTokens, (req, res) => {
	res.json(req.user);
})

module.exports = router;
