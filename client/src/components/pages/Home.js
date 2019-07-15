import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
// import AuthContext from "../../context/auth/authContext";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const Home = () => {
	const authContext = useContext(AuthContext);

	useEffect(() => {
		authContext.loadUser();
		// eslint-disable-next-line
	}, []);
	return (
		<div>
			<div className="main-content home-container">
				<Navbar />
				<div className=" grid-2 container">
					<div className="contactForm-container">
						<ContactForm />
					</div>
					<div>
						<ContactFilter />
						<Contacts />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
