const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const helmet = require("helmet");

const app = express();

// utilizing helmet to secure the app by setting various HTTP headers, including the non-default CSP header which also allows resources from Font Awesome and Google Fonts
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: [ "'self'" ],
			styleSrc: [
				"'self'",
				"https://use.fontawesome.com/releases/v5.6.3/css/all.css",
				"https://fonts.googleapis.com"
			],
			fontSrc: [ "https://fonts.googleapis.com", "https://use.fontawesome.com", "https://fonts.gstatic.com" ]
		}
	})
);

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
