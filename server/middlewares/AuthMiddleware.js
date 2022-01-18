
const {verify} = require('jsonwebtoken');

/**
 * add middleware to let user with proper token to comment on post
 * @param req
 * @param res
 * @param next
 */
const validateTokens = (req, res, next) => {
	const accessToken = req.header('accessToken');
	if (!accessToken) {
		return res.json({error: 'User not login'});
	}

	try {
		const validToken = verify(accessToken, 'importantsecret');

		req.user = validToken;

		if (validToken) {
			return next()
		}
	} catch (err) {
		return res.json({error: err});
	}

};

module.exports = {validateTokens};
