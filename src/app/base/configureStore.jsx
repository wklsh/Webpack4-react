import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from '../redux/index';

let composeEnhancers;
if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose;
} else {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
