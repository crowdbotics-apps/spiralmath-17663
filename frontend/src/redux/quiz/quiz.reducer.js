import quizTypes from "./quiz.types";

const initialState = {
  deleteLoading: false,
  editLoading: false,
  getLoading: false,
  error: "",
  quizzes: null,
  quizCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case quizTypes.GETALL_QUIZ_REQUEST:
      return { ...state, quizzes: null, quizCount: 0, loading: true };
    case quizTypes.GETALL_QUIZ_SUCCESS:
      return {
        ...state,
        quizzes: action.payload.quizzes,
        quizCount: action.payload.quizCount,
        getLoading: false,
      };
    case quizTypes.GETALL_QUIZ_FAILURE:
      return {
        ...state,
        quizzes: null,
        quizCount: 0,
        getLoading: false,
        error: "Failed to load quizzes",
      };
    case quizTypes.DELETE_QUIZ_REQUEST:
      return { ...state, deleteLoading: true };
    case quizTypes.DELETE_QUIZ_SUCCESS:
      return { ...state, deleteLoading: false };
    case quizTypes.DELETE_QUIZ_FAILURE:
      return { ...state, deleteLoading: false };
    case quizTypes.EDIT_QUIZ_REQUEST:
      return { ...state, editLoading: true };
    case quizTypes.EDIT_QUIZ_SUCCESS:
      return { ...state, editLoading: false };
    case quizTypes.EDIT_QUIZ_FAILURE:
      return { ...state, editLoading: false };
    default:
      return state;
  }
};
