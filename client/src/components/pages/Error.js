import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";
import mailman from "../../img/mailman.png";

const Error = () => {
	const authContext = useContext(AuthContext);

	return (
		<div className="main-body">
			<div className="container">
				<div className="error-container">
					<img src={mailman} alt="Man looking on a map" />
					<h1>Sorry, but this page isn't on the map :(</h1>
					<h3>How about heading back home?</h3>
					<Link className="home-link" to={authContext.token ? "/home" : "/"}>
						Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Error;
