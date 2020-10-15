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
import localReducer from "./local/local.reducer";
import questionReducer from "./question/question.reducer";
import { questionFormStateReducer } from "./questionFormState/questionFormState.reducer";
import { answerFormStateReducer } from "./questionFormState/questionFormState.reducer";

const persistConfig = {
   key: "root",
   storage,
   whitelist: [],
};

const rootReducer = combineReducers({
   answer: answerFormStateReducer,
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
   local: localReducer,
   question: questionReducer,
   questionFormStateReducer,
});

export default persistReducer(persistConfig, rootReducer);
