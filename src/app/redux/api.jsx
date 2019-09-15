import immer from 'immer';
import { store } from '../base/configureStore';

/**
 * Handle all of the loading, failure and success of each asynchronous api call in a single file.
 * updates store with [loading state, success state, error state, error code]
 */
import { getErrorMessage, getErrorCode } from '../base/functions';

export function apiReducer(state = {}, action) {
  const { type, payload, error } = action;
  const matches = /(.*)_(LOADING|SUCCESS|ERROR|RESET)/.exec(type); // only check loading and success type

  // if not match, we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return immer(state, draft => {
    if (requestState === 'RESET') {
      draft.status = type;
      draft[requestName] = [false, false, ''];
    } else {
      draft.status = type;
      draft[requestName] = [
        requestState === 'LOADING',
        requestState === 'SUCCESS' ? payload || true : false,
        requestState === 'ERROR' ? getErrorMessage(error) : '',
        getErrorCode(error),
      ];
    }
  });
}

/**
 * Reset redux state
 * @param {string} type 	type of redux action
 */
export function resetState(type) {
  return dispatch => dispatch({ type: `${type}_RESET` });
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
  return store.getState().api[type] || [false, false, '', 0];
}
