import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Welcome from "./components/pages/Welcome";
import Error from "./components/pages/Error";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import AlertState from "./context/alert/AlertState";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import "./main.scss";

// stores the token in the header if a token is present
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<div className="route-container">
							<Alerts />
							<Switch>
								<Route exact path="/" component={Welcome} />
								<PrivateRoute exact path="/home" component={Home} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<Route component={Error} />
							</Switch>
						</div>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
