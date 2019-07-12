import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, logout, user } = authContext;
	const { clearContacts } = contactContext;
	const onLogout = () => {
		logout();
		clearContacts();
	};

	// const authLinks = (
	// 	<Fragment>
	// 		<li>Hello {user && user.name}</li>
	// 		<li>
	// 			<a onClick={onLogout} href="#!">
	// 				<i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
	// 			</a>
	// 		</li>
	// 	</Fragment>
	// );

	// const guestLinks = (
	// 	<Fragment>
	// 		<li>
	// 			<Link to="/">Home</Link>
	// 		</li>
	// 		<li>
	// 			<Link to="/register">Register</Link>
	// 		</li>
	// 		<li>
	// 			<Link to="/login">Login</Link>
	// 		</li>
	// 	</Fragment>
	// );

	{
		/* <div className="navbar bg-primary">
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div> */
	}
	return (
		<div className="home-navbar">
			<nav className="navbar container">
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
	);
};

export default Navbar;
