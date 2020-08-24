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
  settings,
  userTypesReducer,
  resetUserPassword,
} from "./user/user.reducer";
import modalReducer from "./modals/modals.reducer";
import messageReducer from "./message/message.reducer";
import mainSettings from "./setting/setting.reducer";

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
  settings,
  userTypes: userTypesReducer,
  modal: modalReducer,
  resetUserPassword,
  message: messageReducer,
  mainSettings,
});

export default persistReducer(persistConfig, rootReducer);
