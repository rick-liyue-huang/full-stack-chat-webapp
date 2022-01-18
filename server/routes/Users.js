const express = require('express');
const router = express.Router();
const {Users} = require('../models');
const bcrypt = require('bcrypt');

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
			else res.json('You logged in!!!');
		});
	else{
		res.json({ error: "User doesn't exist"})
	}
})

module.exports = router;
