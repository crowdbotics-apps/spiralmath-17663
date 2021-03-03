import quizTypes from "../quiz/quiz.types";

export default (state = null, action) => {
  switch (action.type) {
    case quizTypes.GET_QUIZ_REQUEST:
      return { loading: true };
    case quizTypes.GET_QUIZ_SUCCESS:
      return { data: action.payload };
    case quizTypes.GET_QUIZ_FAILURE:
      return state;
    case quizTypes.RESET_QUIZ_DATA:
      return null;
    default:
      return state;
  }
};
