const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// register a user
router.post(
	"/",
	[
		check("name", "Please add a name").not().isEmpty(),
		check("email", "Please include a valid email address").isEmail(),
		check("password", "Please ensure your password has 6 or more characters").isLength({ min: 6 })
	],
	(req, res) => {
		const errors = validationResult(req);
		// if errors isn't empty, send a 400 status and the array of errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.send("passed");
	}
);

module.exports = router;
