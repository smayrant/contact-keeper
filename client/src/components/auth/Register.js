import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = props => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated } = authContext;

	useEffect(
		() => {
			if (isAuthenticated) {
				props.history.push("/home");
			}
			if (error === "User already exists") {
				setAlert(error, "danger");
				clearErrors();
			}
			// eslint-disable-next-line
		},
		[ error, isAuthenticated, props.history ]
	);

	const [ user, setUser ] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});

	const { name, email, password, password2 } = user;

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		if (name === "" || email === "" || password === "") {
			setAlert("Please ensure all fields are filled in", "danger");
		} else if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else if (password.length < 6) {
			setAlert("Password length must be greater than 6 characters", "danger");
		} else {
			register({
				name,
				email,
				password
			});
		}
	};

	return (
		<div className="form-container main-content">
			<h3>ContactKeeper</h3>
			<h1>Get Started for Free!</h1>
			<p>No commitment. No credit card required.</p>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<input type="text" name="name" value={name} onChange={onChange} />
					<label htmlFor="name">Name</label>
				</div>
				<div className="form-group">
					<input type="email" name="email" value={email} onChange={onChange} />
					<label htmlFor="email">Email Address</label>
				</div>
				<div className="form-group">
					<input type="password" name="password" value={password} onChange={onChange} />
					<label htmlFor="password">Password</label>
				</div>
				<div className="form-group">
					<input type="password" name="password2" value={password2} onChange={onChange} />
					<label htmlFor="password2">Confirm Password</label>
				</div>
				<input className="submit-button" type="submit" value="Register" />
			</form>
		</div>
	);
};

export default Register;
