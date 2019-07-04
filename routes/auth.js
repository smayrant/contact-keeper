const express = require("express");
const router = express.Router();

// retrieve logged in user
router.get("/", (req, res) => {
	res.send("Retrieve logged in user");
});

// log in the user
router.post("/", (req, res) => {
	res.send("Log in the user");
});

module.exports = router;
