import quizTypes from "./quiz.types";
import quizServices from "./quiz.services";

const getAllQuizzes = (pageNumber, queryStr) => {
  return (dispatch) => {
    dispatch({ type: quizTypes.GETALL_QUIZ_REQUEST });
    console.log("querystr", queryStr);
    quizServices.getAllQuizzes(pageNumber, queryStr).then(
      (res) =>
        dispatch({
          type: quizTypes.GETALL_QUIZ_SUCCESS,
          payload: { quizCount: res.count, quizzes: res.results },
        }),
      (err) => dispatch({ type: quizTypes.GETALL_QUIZ_FAILURE })
    );
  };
};

const deleteQuiz = (id) => {
  return (dispatch) => {
    dispatch({ type: quizTypes.DELETE_QUIZ_REQUEST });
    quizServices.deleteQuiz(id).then(
      (res) => {
        dispatch({ type: quizTypes.DELETE_QUIZ_SUCCESS });
      },
      (err) => {
        dispatch({ type: quizTypes.DELETE_QUIZ_FAILURE });
      }
    );
  };
};

const editQuiz = (id, data) => {
  return (dispatch) => {
    dispatch({ type: quizTypes.EDIT_QUIZ_REQUEST });
    quizServices.editQuiz(id, data).then(
      (res) => {
        dispatch({ type: quizTypes.EDIT_QUIZ_SUCCESS });
      },
      (err) => {
        dispatch({ type: quizTypes.EDIT_QUIZ_FAILURE });
      }
    );
  };
};

const createQuiz = (data) => {
  return (dispatch) => {
    dispatch({ type: quizTypes.CREATE_QUIZ_REQUEST });
    quizServices.createQuiz(data).then(
      (res) => {
        dispatch({ type: quizTypes.CREATE_QUIZ_SUCCESS });
        window.location.href = "/#/quizzes";
      },
      (err) => {
        const key = Object.keys(err)[0];
        err = { key, message: err[key][0] };
        dispatch({ type: quizTypes.CREATE_QUIZ_FAILURE, error: err });
      }
    );
  };
};

const getQuiz = (id) => {
  return (dispatch) => {
    dispatch({ type: quizTypes.GET_QUIZ_REQUEST });
    quizServices.getQuiz(id).then(
      (res) => {
        dispatch({ type: quizTypes.GET_QUIZ_SUCCESS, payload: res });
      },
      (err) => {
        dispatch({ type: quizTypes.GET_QUIZ_FAILURE });
      }
    );
  };
};

const resetLoadings = () => {
  return { type: quizTypes.RESET_LOADINGS };
};

const resetQuizData = () => {
  return { type: quizTypes.RESET_QUIZ_DATA };
};

export const clearQuizError = () => {
  return { type: quizTypes.CLEAR_QUIZ_ERROR };
};

export default {
  resetLoadings,
  createQuiz,
  getAllQuizzes,
  deleteQuiz,
  editQuiz,
  getQuiz,
  resetQuizData,
  clearQuizError,
};
