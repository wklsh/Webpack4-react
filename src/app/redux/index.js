import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { test } from "./test";

const persistConfig = {
	key: "root",
	storage: storage,
	blacklist: ["test"]
};

const reducers = persistCombineReducers(persistConfig, { test });
export default reducers;
