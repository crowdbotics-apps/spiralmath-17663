import quizTypes from "./quiz.types";

const initialState = {
  loading: false,
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
        loading: false,
      };
    case quizTypes.GETALL_QUIZ_FAILURE:
      return {
        ...state,
        quizzes: null,
        quizCount: 0,
        loading: false,
        error: "Failed to load quizzes",
      };
    default:
      return state;
  }
};
