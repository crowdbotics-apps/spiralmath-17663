import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  alert,
  authentication,
  registration,
  confirmation,
  users,
  reset,
  contactUs,
} from "./user/user.reducer";
import modalReducer from "./modals/modals.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  alert,
  authentication,
  registration,
  confirmation,
  reset,
  users,
  contactUs,
  modal: modalReducer,
});

export default persistReducer(persistConfig, rootReducer);
