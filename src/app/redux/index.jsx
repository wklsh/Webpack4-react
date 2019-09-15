import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiReducer } from './api';

const storageConfig = {
  key: 'primary',
  storage,
  blacklist: [''],
};

const reducers = persistCombineReducers(storageConfig, {
  api: apiReducer,
});

export default reducers;
