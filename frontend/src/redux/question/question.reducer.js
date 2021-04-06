import questionTypes from "./question.type";

const initialState = {
  userQuestions: {},
  allQuestions: {},
  deletingQuestion: false,
  updatingQuestion: false,
  creatingQuestion: false,
  creatingAnswer: false,
  loadingUserQuestions: false,
  loadingAllUserQuestions: false,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case questionTypes.GETSTANDARDCODE_SUCCESS:
      return { ...state, standardCode: action.payload };
    case questionTypes.GET_REVIEWERS_SUCCESS:
      return { ...state, reviewers: action.payload };
    case questionTypes.GET_CREATORS_SUCCESS:
      return { ...state, creators: action.payload };
    case questionTypes.CREATE_QUESTION_REQUEST:
      return { ...state, creatingQuestion: true, error: "" };
    case questionTypes.CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        creatingQuestion: "success",
        error: "",
      };
    case questionTypes.CREATE_QUESTION_FAILURE:
      return {
        ...state,
        creatingQuestion: "fail",
        error: action.error.message,
      };
    case questionTypes.CREATE_ANSWER_REQUEST:
      return { ...state, creatingAnswer: true, error: "" };
    case questionTypes.CREATE_ANSWER_SUCCESS:
      return { ...state, creatingAnswer: "success", error: "" };
    case questionTypes.CREATE_ANSWER_FAILURE:
      return { ...state, creatingAnswer: "fail", error: action.error.message };
    case questionTypes.GET_USERQUESTION_REQUEST:
      return { ...state, loadingUserQuestions: true };
    case questionTypes.GET_USERQUESTION_SUCCESS:
      return {
        ...state,
        loadingUserQuestions: false,
        userQuestions: {
          questionCount: action.data.count,
          questions: action.data.results,
        },
      };
    case questionTypes.GET_USERQUESTION_FAILURE:
      return { ...state, loadingUserQuestions: false };
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
        error: "",
      };
    case questionTypes.UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        updatingQuestion: "success",
        error: "",
      };
    case questionTypes.UPDATE_QUESTION_FAILURE:
      return {
        ...state,
        updatingQuestion: "fail",
        error: action.error.message,
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
    case questionTypes.QUESTION_STATE_CHANGER:
      return {
        ...state,
        creatingQuestion: false,
        creatingAnswer: false,
        updatingQuestion: false,
      };
    default:
      return state;
  }
};
