import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import AuthContext from "../../context/auth/authContext";
import community from "../../img/social-care.svg";
import family from "../../img/family.svg";
import network from "../../img/computer.svg";
import Footer from "../layout/Footer";

const Welcome = () => {
	const authContext = useContext(AuthContext);
	return (
		<div>
			<div className="main-content">
				<div className="welcome-bg">
					<div className="navbar-container">
						<nav className="navbar">
							<div className="navbar-logo-container">
								<h1>ContactKeeper</h1>
							</div>
							{authContext.token ? (
								<div className="navbar-links-container">
									<li className="navbar-link">
										<Link to="/home">View My Account</Link>
									</li>
								</div>
							) : (
								<div className="navbar-links-container">
									<li className="navbar-link">
										<Link to="/register">Register</Link>
									</li>
									<li className="navbar-link">
										<Link to="/login">Login</Link>
									</li>
								</div>
							)}
						</nav>
					</div>
					<div className="container">
						<div className="title-block">
							<h1>The Contact Manager For You</h1>
							<h3>Stop searching for the best contact manager, you just found it!</h3>
							<Link to="/register">
								<button className="welcome-button">Sign Me Up!</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="container">
					<h1 className="headline">Keep track of your customers</h1>
					<div className="img-text-container top-img-text-container">
						<p>
							Don't depend on your company's directory, keep track of your customers on your own time.
							ContactKeeper is available to store your customers' information whenever and wherever you
							need it. Whether or desktop or on mobile, ContactKeeper is here for you.
						</p>
						<img src={community} alt="Hand holding individuals" />
					</div>
					<h1 className="headline">Keep in touch with friends/family</h1>
					<div className="img-text-container bottom-img-text-container">
						<img src={family} alt="family standing together" />
						<p>
							After a long, hard day of work there is nothing like being able to unwind and have a
							lighthearted conversation with friends and family. With ContactKeeper you'll be ensured that
							you won't lose contact with your loved ones.
						</p>
					</div>
				</div>
				<div className="connected-outer-container">
					<div className="container">
						<div className="connected-inner-container">
							<h1 className="headline">stay connected</h1>
							<p>
								No matter if you need to keep in touch with colleagues, customers, business partners or
								friends and family, ContactKeeper allows you to never worry about losing contact with
								anyone.
							</p>
							<img className="network-img" src={network} alt="network of connected devices" />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Welcome;
