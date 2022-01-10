const express = require('express');
const app = express();
const db = require('./models');
const PORT = 3500;

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is listening on port of ${PORT}`);
	});
});



