import immer from "immer";
import { store } from "../base/configureStore";

/**
 * Handle all of the loading, failure and success of each asynchronous api call in a single file.
 * updates store with [loading state, success state, error state, error code]
 */
import { getErrorMessage, getErrorCode } from "../base/functions";

export const apiReducer = (state = {}, action) => {
	const { type, payload, error } = action;
	const matches = /(.*)_(LOADING|SUCCESS|ERROR|RESET)/.exec(type); // only check loading and success type

	// if not match, we ignore them
	if (!matches) return state;

	const [, requestName, requestState] = matches;

	return immer(state, (draft) => {
		if (requestState === "RESET") {
			draft.status = type;
			draft[requestName] = [false, false, ""];
		} else {
			draft.status = type;
			draft[requestName] = [
				requestState === "LOADING",
				requestState === "SUCCESS" ? payload || true : false,
				requestState === "ERROR" ? getErrorMessage(error) : "",
				getErrorCode(error),
			];
		}
	});
};

export function resetState(type) {
	return (dispatch) => dispatch({ type: `${type}_RESET` });
}

/**
 * ApiSelector which can pick success, error and loading state
 * for a specific action type
 * one api call should follow [BASE_TYPE, BASE_TYPE_LOADING, BASE_TYPE_ERROR, BASE_TYPE_SUCCESS]
 *
 * @param {String}   type       type of redux action
 * @return {Array}  [{Bool}, {Bool}, {String}, {Number}]   [loading state, success state, error state, error code]
 */
export function apiSelector(type) {
	return store.getState().api[type] || [false, false, "", 0];
}

/**
 * Pick error for a specific action type
 *
 * @param {String}  type       type of redux action
 */
export function loadingSelector(type) {
	const state = store.getState().api[type];

	return state && state[0] ? state[0] : false;
}

/**
 * Pick success for a specific action type
 *
 * @param {String}  type       type of redux action
 */
export function successSelector(type) {
	const state = store.getState().api[type];

	return state && state[1] ? state[1] : false;
}

/**
 * Pick error for a specific action type
 *
 * @param {String}  type       type of redux action
 */
export function errorSelector(type) {
	const state = store.getState().api[type];

	return state && state[2] ? state[2] : "";
}

/**
 * Pick errorCode for a specific action type
 *
 * @param {String}  type       type of redux action
 */
export function errorCodeSelector(type) {
	const state = store.getState().api[type];

	return state && state[3] ? state[3] : "";
}
