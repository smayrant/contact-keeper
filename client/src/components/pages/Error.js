import React from "react";
import mailman from "../../img/mailman.png";

const Error = () => {
	return (
		<div>
			<div className="container">
				<div className="error-container">
					<img src={mailman} alt="" />
					<h1>Sorry, but this page isn't on the map :(</h1>
				</div>
			</div>
		</div>
	);
};

export default Error;
