import quizTypes from "./quiz.types";
import quizService from "./quiz.services";

export const getAllQuizzes = (pageNumber) => {
  return (dispatch) => {
    dispatch({ type: quizTypes.GETALL_QUIZ_REQUEST });
    quizService.getAllQuizzes(pageNumber).then(
      (res) =>
        dispatch({
          type: quizTypes.GETALL_QUIZ_SUCCESS,
          payload: { quizCount: res.count, quizzes: res.results },
        }),
      (err) => dispatch({ type: quizTypes.GETALL_QUIZ_FAILURE })
    );
  };
};

export default {
  getAllQuizzes,
};
