const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const helmet = require("helmet");

// user and contact models
const User = require("../models/User");
const Contact = require("../models/Contact");

// utilizing helmet to secure the app by setting various HTTP headers, including the non-default CSP header which also allows resources from Font Awesome and Google Fonts
router.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: [ "'self'" ],
			styleSrc: [ "'self'", "https://use.fontawesome.com/releases/v5.6.3/css/all.css" ],
			fontSrc: [ "https://fonts.googleapis.com" ]
		}
	})
);

// get user's contacts
router.get("/", auth, async (req, res) => {
	try {
		// retrieve contacts, finding them by user's id and sorting by newest first
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
		res.json(contacts);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// add new contact
router.post("/", [ auth, [ check("name", "Name is required").not().isEmpty() ] ], async (req, res) => {
	// retrieve validation errors
	const errors = validationResult(req);
	// if errors isn't empty, send a 400 status and the array of errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, phone, type } = req.body;

	try {
		// create new contact instance
		const newcontact = new Contact({
			name,
			email,
			phone,
			type,
			user: req.user.id
		});
		// save contact to DB
		const contact = await newcontact.save();
		// return the contact
		res.json(contact);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// update contact
router.put("/:id", auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	// build contact object and add the fields to object if they exist
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		// find contact by id within route parameter
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(404).json({ msg: "Contact not found" });

		// ensure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized " });
		}

		// find contact by id, setting the contactFields and creating the contact if it doesn't exist
		contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

		res.json(contact);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// delete contact
router.delete("/:id", auth, async (req, res) => {
	try {
		// find contact by id within route parameter
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(404).json({ msg: "Contact not found" });

		// ensure user owns contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "Not authorized " });
		}

		// find contact by id and remove it
		await Contact.findByIdAndRemove(req.params.id);

		res.json({ msg: "Contact removed" });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
