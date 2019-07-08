import axios from "axios";

// if a token is present, place it in the default header, otherwise, delete it
const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common["x-auth-token"] = token;
	} else {
		delete axios.defaults.headers.common["x-auth-token"];
	}
};

export default setAuthToken;
