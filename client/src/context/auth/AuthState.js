import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from "../Types";

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem("token"),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};
	const [ state, dispatch ] = useReducer(authReducer, initialState);

	const loadUser = () => console.log("log user");

	const register = async formData => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		try {
			const res = await axios.post("/api/users", formData, config);
			// payload receives the token
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
			console.log(res);
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg
			});
		}
	};

	const login = () => console.log("login");

	const logout = () => console.log("logout");

	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				loadUser,
				login,
				logout,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
