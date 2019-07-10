import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Welcome from "./components/pages/Welcome";
import Error from "./components/pages/Error";
import Navbar from "./components/layout/Navbar";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

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
						<Fragment>
							<Alerts />
							<Switch>
								<Route exact path="/" component={Welcome} />
								<div className="container">
									<PrivateRoute exact path="/home" component={Home} />
									<Route exact path="/about" component={About} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/login" component={Login} />
									<Route component={Error} />
								</div>
							</Switch>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
