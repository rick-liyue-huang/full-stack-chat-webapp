const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const postRouter = require('./routes/Posts');
const PORT = 3500;

// solve the problem of cross-origin
app.use(cors());
// let the response know json format
app.use(express.json());
// import routes
app.use('/posts', postRouter);


db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is listening on port of ${PORT}`);
	});
});



