import immer from 'immer';
// import api from "../base/functions/api";

export const GET_TERMS = 'GET_TERMS';
export const GET_TERMS_LOADING = 'GET_TERMS_LOADING';
export const GET_TERMS_SUCCESS = 'GET_TERMS_SUCCESS';
export const GET_TERMS_ERROR = 'GET_TERMS_ERROR';

// /**
//  * get terms and conditions copy
//  */
// export const getTerms = () => dispatch => {
// 	dispatch({ type: GET_TERMS_LOADING });
// 	api(GET_TERMS)
// 		.get("/profile/term-and-condition")
// 		.then(res => {
// 			if (res) {
// 				dispatch({
// 					type: GET_TERMS_SUCCESS,
// 					payload: res.data.data
// 				});
// 			}
// 		});
// };

const initialState = {
  terms: null,
};

export const test = (state = initialState, action) =>
  immer(state, draft => {
    switch (action.type) {
      case GET_TERMS_SUCCESS:
        draft.terms = action.payload.message;
        break;

      default:
        break;
    }
  });
