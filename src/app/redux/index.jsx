import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const storageConfig = {
  key: 'primary',
  storage,
  blacklist: [''],
};

const reducers = persistCombineReducers(storageConfig, {
  // Reducer
});

export default reducers;
