import axios from 'axios';
import { has } from 'lodash';

import { baseEndpointURL, endpointCreds } from '../config';
import { store } from '../configureStore';

/**
 * helper method for axios
 * this method will be trigger interceptors for error and other common validations
 * @param  {string} 	type 	redux action type
 * @return {promise} promise created via axios
 */
export default function(type) {
  const storedAccessToken = store.getState().authentication.accessToken;

  let Authorization = '';
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

  const custom = axios.create(config);
  custom.interceptors.response.use(
    response => {
      console.log(
        'Boilerplate: Check response status codes to ensure errors are dispatched out correctly'
      );

      // Check if its a error response
      if (response.data.StatusCode !== 200) {
        store.dispatch({
          type: `${type}_ERROR`,
          error: response.data,
        });

        return null;
      }

      return response;
    },
    error => {
      // dispatch the error state with error param
      store.dispatch({
        type: `${type}_ERROR`,
        error: error.response.data,
      });
      return Promise.reject(error.response.data);
    }
  );

  return custom;
}

/**
 * attempt to extract xhr error message from a variety of formats
 * @param  {object} 	err 	xhr response object
 * @return {string}     		extracted error message
 */
export function getErrorMessage(err) {
  let returnVal;

  if (has(err, 'Message')) {
    returnVal = err.Message;
  }

  return returnVal;
}

/**
 * get errorCode from endpoints
 * fallback to statusCode if errorCode is not available
 * @param  {object}     res     xhr response object
 * @return {number}             error code
 */
export function getErrorCode(err) {
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
