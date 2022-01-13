const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {Users} = require('../models');

router.post('/',  (req, res) => {
	const {username, password} = req.body;
	bcrypt.hash(password, 10).then((hash) => {
		Users.create({
			username: username,
			password: hash
		})
		res.json('Success')
	})
});

router.post('/login', async (req, res) => {
	const {username, password} = req.body;
	const user = await Users.findOne({where: {username: username}})

	if (user) {
		bcrypt.compare(password, user.password).then(match => {
			if (!match) {
				res.json({error: 'wrong username or password'});
			} else {
				res.json('login already');
			}
		})
	} else {
		res.json({error: "User doesn't exist"});
	}
})

module.exports = router;