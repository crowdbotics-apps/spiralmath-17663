import questionTypes from "./question.type";

const initialState = {
   userQuestions: [],
   allQuestions: [],
   deletingQuestion: false,
   editingQuestion: false,
   creatingQuestion: false,
   loadingUserQuestions: false,
   loadingAllUserQuestions: false,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case questionTypes.CREAT_QUESTION_REQUEST:
         return state;
      default:
         return state;
   }
};
