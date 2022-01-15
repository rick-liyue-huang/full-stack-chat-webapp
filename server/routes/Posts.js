const express = require('express');
const router = express.Router();
const {Posts} = require('../models');
const {raw} = require("express");

router.get('/', async (req, res) => {
	const listOfPosts = await Posts.findAll();
	res.json(listOfPosts);
});

router.post('/', async (req, res) => {
	const post = req.body;
	// connect to database and create table data
	await Posts.create(post);
	res.json(post);
});


module.exports = router;
