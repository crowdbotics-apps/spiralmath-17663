import questionTypes from "./question.type";

const initialState = {
   userQuestions: {},
   allQuestions: {},
   answer: {},
   deletingQuestion: false,
   updatingQuestion: false,
   creatingQuestion: false,
   creatingAnswer: false,
   loadingUserQuestions: false,
   loadingAllUserQuestions: false,
};

export default (state = initialState, action) => {
   switch (action.type) {
      case questionTypes.GETSTANDARDCODE_SUCCESS:
         return { ...state, standardCode: action.payload };
      case questionTypes.GET_REVIEWERS_SUCCESS:
         return { ...state, reviewers: action.payload };
      case questionTypes.GET_CREATOR_SUCCESS:
         return { ...state, creators: action.payload };
      case questionTypes.CREATE_QUESTION_REQUEST:
         return { ...state, creatingQuestion: true };
      case questionTypes.CREATE_QUESTION_SUCCESS:
         return { ...state, creatingQuestion: "success" };
      case questionTypes.CREATE_QUESTION_FAILURE:
         return { ...state, creatingQuestion: "fail" };
      case questionTypes.CREATE_ANSWER_REQUEST:
         return { ...state, creatingAnswer: true };
      case questionTypes.CREATE_ANSWER_SUCCESS:
         return { ...state, creatingAnswer: "success" };
      case questionTypes.CREATE_ANSWER_FAILURE:
         return { ...state, creatingAnswer: "fail" };
      case questionTypes.GET_USERQUESTION_SUCCESS:
         return {
            ...state,
            userQuestions: {
               questionCount: action.data.count,
               questions: action.data.results,
            },
         };
      case questionTypes.GET_QUESTION_SUCCESS:
         return {
            ...state,
            allQuestions: {
               questionCount: action.data.count,
               questions: action.data.results,
            },
         };
      case questionTypes.UPDATE_QUESTION_REQUEST:
         return {
            ...state,
            updatingQuestion: true,
         };
      case questionTypes.UPDATE_QUESTION_SUCCESS:
         return {
            ...state,
            updatingQuestion: "success",
         };
      case questionTypes.UPDATE_QUESTION_FAILURE:
         return {
            ...state,
            updatingQuestion: "fail",
         };
      case questionTypes.DELETE_QUESTION_REQUEST:
         return {
            ...state,
            deletingQuestion: true,
         };
      case questionTypes.DELETE_QUESTION_SUCCESS:
         return {
            ...state,
            deletingQuestion: false,
         };
      case questionTypes.DELETE_QUESTION_FAILURE:
         return {
            ...state,
            deletingQuestion: false,
         };
      case questionTypes.GET_ANSWER_SUCCESS:
         return {
            ...state,
            answer: { ...state.answer, ...action.data.details[0] },
         };
      case questionTypes.QUESTION_STATE_CHANGER:
         return {
            ...state,
            creatingQuestion: false,
            creatingAnswer: false,
            updatingQuestion: false,
         };
      case questionTypes.RESET_ANSWER_STATE:
         return { ...state, answer: {} };
      default:
         return state;
   }
};
