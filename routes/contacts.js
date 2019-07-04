const express = require("express");
const router = express.Router();

// get user's contacts
router.get("/", (req, res) => {
	res.send("Get all user contacts");
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
