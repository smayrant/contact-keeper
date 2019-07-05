const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// retrieve logged in user, passing in auth middleware
router.get("/", auth, async (req, res) => {
	try {
		// retrieve user from DB based on user's id, ensuring not to select password
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// log in the user
router.post(
	"/",
	[ check("email", "Please include a valid email address"), check("password", "Password is required") ],
	async (req, res) => {
		const errors = validationResult(req);
		// if errors isn't empty, send a 400 status and the array of errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// find user based on their email
			let user = await User.findOne({ email });
			// if there is no user with the found email, return a 400 status
			if (!user) {
				return res.status(400).json({ msg: "Invalid email" });
			}
			// use bcrypt's compare method to compare the typed in password from the user and the saved, hashed password
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: "Invalid password" });
			}

			// object to send in token
			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 36000
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
