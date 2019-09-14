import axios from "axios";

import { baseEndpointURL } from "../config";
import { store } from "../configureStore";
import { errorCodeSelector } from "../../redux/api";

/**
 * helper method for axios
 * this method will be trigger interceptors for error and other common validations
 * @param  {string} 	type 	redux action type
 * @return {promise} promise created via axios
 */
export default function(type) {
	let config = {
		baseURL: baseEndpointURL,
	};

	const custom = axios.create(config);
	custom.interceptors.response.use(
		function(response) {
			// errorCode check for rtt api response
			// status check for stripe api response
			if (
				response.data.errorCode !== 0 &&
				(!Object(response.data).hasOwnProperty("errorCode") &&
					response.status !== 200)
			) {
				// dispatch the error state depend on error code
				store.dispatch({ type: `${type}_ERROR`, error: response.data });

				return null;
			}

			handleSessionExpiry(response);
			return response;
		},
		function(error) {
			// dispatch the error state with error param
			store.dispatch({ type: `${type}_ERROR`, error });
			handleSessionExpiry(error.response);
			return Promise.reject(error);
		}
	);

	return custom;
}

/**
 * session can expire when user logs out on other devices / browsers / computers
 */
function handleSessionExpiry(res) {
	if (!res || res.status !== 401) return;

	const facebookVerifyErrorCode = errorCodeSelector(FACEBOOK_VERIFY);
	// 155 = registered via facebook before
	// 164 = no email addres in facebook response
	if ([155, 164].includes(facebookVerifyErrorCode)) return;

	const reduxStore = store.getState();
	if (reduxStore.ui.showAuthentication !== "log-in") {
		store.dispatch(sessionExpiry());
	}
}
