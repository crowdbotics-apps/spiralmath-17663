import localTypes from "./local.types";

const initialState = {
   questions: false,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case localTypes.SET_QUESTION_TYPE:
         return { ...state, questions: action.payload };
      default:
         return state;
   }
};
