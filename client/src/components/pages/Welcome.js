import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import community from "../../img/social-care.svg";
import family from "../../img/family.svg";

const Welcome = () => {
	return (
		<div className="main-content">
			<div className="welcome-bg">
				<div className="navbar-container">
					<nav className="navbar">
						<div className="navbar-logo-container">
							<h1>ContactKeeper</h1>
						</div>
						<div className="navbar-links-container">
							<li className="navbar-link">
								<Link className="" to="/register">
									Register
								</Link>
							</li>
							<li className="navbar-link">
								<Link className="" to="/login">
									Login
								</Link>
							</li>
						</div>
					</nav>
				</div>
				<div className="container">
					<div className="title-block">
						<h1>The Contact Manager For You</h1>
						<h3>Stop searching for the best contact manager, you just found it!</h3>
						<Link to="/register">
							<button className="title-block-button">Sign Me Up!</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="container">
				<h1 className="headline">Keep track of your customers</h1>
				<div className="img-text-container">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum iure quam alias dolor quaerat
						repellat, numquam ut sed tempore magni natus totam a laboriosam ex tenetur officia est maiores
						voluptates.
					</p>
					<img src={community} alt="Hand holding individuals" />
				</div>
				<h1 className="headline">Keep in touch with family</h1>
				<div className="img-text-container">
					<img src={family} alt="family standing together" />
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum iure quam alias dolor quaerat
						repellat, numquam ut sed tempore magni natus totam a laboriosam ex tenetur officia est maiores
						voluptates.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
