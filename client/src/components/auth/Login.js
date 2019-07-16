import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = props => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated } = authContext;

	useEffect(
		() => {
			if (isAuthenticated) {
				props.history.push("/home");
			}
			if (error === "Invalid Credentials") {
				setAlert(error, "danger");
				clearErrors();
			}
		},
		// eslint-disable-next-line
		[ error, isAuthenticated, props.history ]
	);

	const [ user, setUser ] = useState({
		email: "",
		password: ""
	});

	const { email, password } = user;

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		if (email === "" || password === "") {
			setAlert("Please fill in both fields", "danger");
		} else {
			login({
				email,
				password
			});
		}
	};

	return (
		<div className="form-container  main-content">
			<h2 className="title">ContactKeeper</h2>
			<h1>Account Login</h1>
			<form className="login-form" onSubmit={onSubmit}>
				<div className="form-group">
					<input type="email" name="email" value={email} onChange={onChange} />
					<label htmlFor="name">Email Address</label>
				</div>
				<div className="form-group">
					<input type="password" name="password" value={password} onChange={onChange} />
					<label htmlFor="password">Password</label>
				</div>
				<input type="submit" value="Login" className="submit-button login-button" />
			</form>
			<div>
				<Link className="back-home-link" to="/">
					Go Home
				</Link>
			</div>
		</div>
	);
};

export default Login;
