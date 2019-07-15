import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = () => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { logout, user } = authContext;
	const { clearContacts } = contactContext;
	const onLogout = () => {
		logout();
		clearContacts();
	};

	return (
		<div className="home-navbar-container">
			<nav className="navbar container home-navbar">
				<div className="navbar-logo-container">
					<Link className="home-link" to="/">
						<h2 className="home-navbar-logo">ContactKeeper</h2>
					</Link>
				</div>
				<div className="navbar-links-container home-navbar-links-container">
					<li className="navbar-greeting">Hello {user && user.name}</li>
					<li>
						<a className="logout-link" onClick={onLogout} href="#!">
							<i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
						</a>
					</li>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
