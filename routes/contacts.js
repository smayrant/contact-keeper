const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// user and contact models
const User = require("../models/User");
const Contact = require("../models/Contact");

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

// delete contact
router.delete("/:id", (req, res) => {
	res.send("Delete contact");
});

module.exports = router;
