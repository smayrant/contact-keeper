const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const helmet = require("helmet");

const User = require("../models/User");

// utilizing helmet to secure the app by setting various HTTP headers, including the non-default CSP header which also allows resources from Font Awesome and Google Fonts
router.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: [ "'self'" ],
			styleSrc: [
				"'self'",
				"https://use.fontawesome.com/releases/v5.6.3/css/all.css",
				"https://fonts.googleapis.com/css?family=Open+Sans:300,400,700|Pacifico&display=swap"
			]
		}
	})
);

// register a user
router.post(
	"/",
	[
		check("name", "Please add a name").not().isEmpty(),
		check("email", "Please include a valid email address").isEmail(),
		check("password", "Please ensure your password has 6 or more characters").isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		// if errors isn't empty, send a 400 status and the array of errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			// find user by email using MongoDB's findOne method and store in user variable
			let user = await User.findOne({ email });
			console.log(user);
			if (user) {
				return res.status(400).json({ msg: "User already exists" });
			}
			// create new instance of user
			user = new User({
				name,
				email,
				password
			});

			// create salt
			const salt = await bcrypt.genSalt(10);
			// hash the password
			user.password = await bcrypt.hash(password, salt);

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

			// save to DB
			await user.save();
		} catch (error) {
			console.log(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
