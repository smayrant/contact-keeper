import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, loading } = authContext;
	return (
		// if the user is not authenticated (not logged in) and the loading state is false, redirect the user to the login route
		<Route
			{...rest}
			render={props => (!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
		/>
	);
};

export default PrivateRoute;
