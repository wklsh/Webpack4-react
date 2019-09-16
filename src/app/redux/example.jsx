import immer from 'immer';
import api from '../base/functions/api';

export const GET_EXAMPLE = 'GET_EXAMPLE';
export const GET_EXAMPLE_LOADING = 'GET_EXAMPLE_LOADING';
export const GET_EXAMPLE_SUCCESS = 'GET_EXAMPLE_SUCCESS';
export const GET_EXAMPLE_ERROR = 'GET_EXAMPLE_ERROR';

/**
 * Example API request
 * @param {string} id 	seed
 */
export const getExample = id => dispatch => {
  dispatch({ type: GET_EXAMPLE_LOADING });

  api(GET_EXAMPLE)
    .get(`/todos/${id || 1}`)
    .then(res => {
      dispatch({
        type: GET_EXAMPLE_SUCCESS,
        payload: res.data,
      });
    });
};

const initialState = {
  data: {},
};

export const example = (state = initialState, action) =>
  immer(state, draft => {
    switch (action.type) {
      case GET_EXAMPLE_SUCCESS:
        draft.data = action.payload;
        break;

      default:
        break;
    }
  });
