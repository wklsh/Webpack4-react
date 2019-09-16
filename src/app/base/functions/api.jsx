import axios from 'axios';

import { baseEndpointURL, endpointCreds } from '../config';
import { store } from '../configureStore';

/**
 * helper method for axios
 * this method will be trigger interceptors for error and other common validations
 * @param  {string} 	type 	redux action type
 * @return {promise} promise created via axios
 */
export default function(type) {
  const storedAccessToken = store.getState().authentication
    ? store.getState().authentication.accessToken
    : null;

  // determine auth token type to use - Basic | Bearer
  let Authorization;
  if (storedAccessToken) {
    Authorization = `Bearer ${storedAccessToken}`;
  } else if (endpointCreds) {
    Authorization = endpointCreds;
  }

  const config = {
    baseURL: baseEndpointURL,
    headers: {
      Authorization,
    },
  };

  console.warn(
    'Boilerplate: Check api status code naming to ensure responses are dispatched out correctly.'
  );

  const custom = axios.create(config);
  custom.interceptors.response.use(
    response => {
      // TODO: Append condition logic to match project's API response format
      if (response.status !== 200) {
        store.dispatch({
          type: `${type}_ERROR`,
          error: response.data,
        });

        return null;
      }

      return response;
    },
    error => {
      // TODO: Append condition logic to match project's API response format
      store.dispatch({
        type: `${type}_ERROR`,
        error: error.response,
      });

      return Promise.reject(error.response);
    }
  );

  return custom;
}

/**
 * get errorCode from endpoints
 * fallback to statusCode if errorCode is not available
 * @param  {object}     res     xhr response object
 * @return {number}             error code
 */
export function getErrorCode(err) {
  console.warn('Boilerplate: Check api error response to ensure error code is captured properly.');
  // TODO: Append condition logic to match project's API response format

  if (!err) return 0;

  let code = null;
  if (err) {
    if (err.data) {
      code = err.data.ErrorCode;
    }
  }
  if (!code && err) {
    code = err.StatusCode;
  }
  return code || 0;
}
