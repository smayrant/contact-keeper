const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	// get token from header
	const token = req.header("x-auth-token");

	// check if token doesn't exist
	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied!" });
	}

	try {
		// verify token payload and store in variable
		const decoded = jwt.verify(token, config.get("jwtSecret"));

		// retrieve user from token payload and store in req object
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};
