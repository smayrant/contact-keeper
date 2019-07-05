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
router.post("/", (req, res) => {
	res.send("Add contact");
});

// delete contact
router.delete("/:id", (req, res) => {
	res.send("Delete contact");
});

module.exports = router;
