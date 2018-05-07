import {REHYDRATE} from 'redux-persist/lib/constants';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// ACTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const hideHeader = (hide) => ({ type: 'HIDE_HEADER', value:hide })
export const hideFooter = (hide) => ({ type: 'HIDE_FOOTER', value:hide })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// REDUCER
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const currentState = [
	{
	    hideHeader: false,
		hideFooter: false
	}
];
export function ui(state = currentState, action) {
	let latestState = state[state.length - 1],
		newState = Object.assign({}, latestState)
	
	switch (action.type) {
		case REHYDRATE:
			//do nothing
			//prevent writing to session storage
			return state;
		break;
		case 'HIDE_HEADER':
			newState.hideHeader = action.value;
			return [...state, newState];
		break;
		case 'HIDE_FOOTER':
			newState.hideHeader = action.value;
			return [...state, newState];
		break;
		default:
		return state;
	}
}