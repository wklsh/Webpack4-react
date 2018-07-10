import axios from "axios";
import { getLastArrayItem } from "BaseAlias/functions";
import { REHYDRATE } from "redux-persist/lib/constants";

import { endpointURL } from "BaseAlias/config";

/******************************************************************************************************
/	Actions
/******************************************************************************************************/
// Action - reset states
export const testAction = (bool) => ({ type: "TEST_ACTION", state: bool });

// Action - test API
export const testAPI = (param) => {
	return (dispatch, getState) => {
		// ==========================================================================================
		// Get any information from other stores.
		// In this case: get accessToken
		//
		// const store = getState();
		// const latestAccessToken = getLastArrayItem(store.authentication).loginAccessToken;
		// ==========================================================================================

		dispatch({ type: "TEST_API" });

		return axios({
			method: "GET",
			url: endpointURL + "/data/2.5/weather?q=" + param
			// headers: {
			// 		Authorization: "Bearer " + latestAccessToken
			// }
		}).then(
			(response) => {
				if (response.status == 0) {
					dispatch({
						type: "TEST_API_SUCCESS",
						response: response
					});
				} else {
					dispatch({
						type: "TEST_API_ERROR",
						error: response
					});
				}
			},
			(error) => {
				dispatch({
					type: "TEST_API_ERROR",
					error: error.response
				});
			}
		);
	};
};

/******************************************************************************************************
/	State
/******************************************************************************************************/
const currentState = [
	{
		testActionState: null,

		testApiStatus: null,
		testApiData: null,
		testApiErrorCode: null,
		testApiErrorMsg: null
	}
];
const defaultState = Object.assign({}, currentState[0]);

/******************************************************************************************************
/	Reducers
/******************************************************************************************************/
export function test(state = currentState, action) {
	let latestState = state[state.length - 1],
		newState = Object.assign({}, latestState);

	switch (action.type) {
		case REHYDRATE:
			// Do nothing
			// Prevent writing to session storage

			// Example:
			// newState.accessToken = action.payload.authentication[action.payload.authentication.length-1].accessToken;

			// Entire payload:
			// console.log(action.payload);
			return state;
			break;

		// Test action
		case "TEST_ACTION":
			newState.testActionState = action.state;
			return [...state, newState];
			break;

		// Test API
		case "TEST_API":
			newState.testApiStatus = null;
			newState.testApiData = null;
			newState.testApiErrorCode = null;
			newState.testApiErrorMsg = null;
			return [...state, newState];
			break;

		case "TEST_API_SUCCESS":
			newState.testApiStatus = action.state;
			newState.testApiData = action.response;
			return [...state, newState];
			break;

		case "TEST_API_ERROR":
			newState.testApiStatus = action.state;
			newState.testApiErrorCode = action.error.errorCode;
			newState.testApiErrorMsg = action.error.errorMsg;
			return [...state, newState];
			break;

		default:
			return state;
	}
}
