const express = require('express');
const db = require('./models');
const app = express();
const PORT = 3001

// let server support json format
app.use(express.json());

/*Router*/
const postRouter = require('./routes/Posts');
app.use(`/posts`, postRouter);

// sequelize is a promise method, so it will create database tables async
db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`this server is listening on port of ${PORT}`);
	});
});

