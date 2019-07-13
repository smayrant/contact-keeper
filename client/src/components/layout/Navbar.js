import React, { useContext } from "react";
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
					<h2 className="home-navbar-headline">ContactKeeper</h2>
				</div>
				<div className="navbar-links-container home-navbar-links-container">
					<li className="navbar-greeting">Hello {user && user.name}</li>
					<li>
						<a onClick={onLogout} href="#!">
							<i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
						</a>
					</li>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
