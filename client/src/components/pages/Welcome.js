import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
	return (
		<div>
			<div className="welcome-bg">
				<div className="navbar-container">
					<nav className="navbar">
						<div className="navbar-logo-container">
							<h1>ContactKeeper</h1>
						</div>
						<div className="navbar-links-container">
							<li className="navbar-link">
								<Link to="/register">Register</Link>
							</li>
							<li className="navbar-link">
								<Link to="/login">Login</Link>
							</li>
						</div>
					</nav>
				</div>
				<div className="container">
					<div className="title-block">
						<h1>The Contact Manager For You</h1>
						<h3>Stop searching for the best contact manager, you just found it!</h3>
						<Link to="/register">
							<button className="title-block-button">I'm Sold!</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="container" />
		</div>
	);
};

export default Welcome;
