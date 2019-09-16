import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiReducer } from './api';

import { example } from './example';

const storageConfig = {
  key: 'primary',
  storage,
  blacklist: ['example'],
};

const reducers = persistCombineReducers(storageConfig, {
  api: apiReducer,
  example,
});

export default reducers;
