import questionTypes from "./question.type";
import questionService from "./question.service";

const getStandardCode = () => {
   return (dispatch) => {
      questionService.getStandardCode().then((data) => {
         dispatch({
            type: questionTypes.GETSTANDARDCODE_SUCCESS,
            payload: data.detail,
         });
      });
   };
};

const getReviewers = () => {
   return (dispatch) => {
      questionService.getReviewers().then((data) => {
         console.log(data);
         dispatch({
            type: questionTypes.GET_REVIEWERS_SUCCESS,
            payload: data.detail,
         });
      });
   };
};

const createQuestion = (formData, answer) => {
   return (dispatch) => {
      dispatch({ type: questionTypes.CREATE_QUESTION_REQUEST });
      questionService.createQuestion(formData).then(
         (data) => {
            dispatch({ type: questionTypes.CREATE_QUESTION_SUCCESS });
            dispatch(createAnswer({ ...answer, question: data.id }));
         },
         (error) => {
            dispatch({ type: questionTypes.CREATE_QUESTION_FAILURE });
         }
      );
   };
};

const createAnswer = (data) => {
   return (dispatch) => {
      dispatch({ type: questionTypes.CREATE_ANSWER_REQUEST });
      questionService.createAnswer(data).then(
         (data) => {
            dispatch({ type: questionTypes.CREATE_ANSWER_SUCCESS });
         },
         (error) => {
            dispatch({ type: questionTypes.CREATE_ANSWER_FAILURE });
         }
      );
   };
};

const getUserQuestions = (queryString) => {
   return (dispatch) => {
      dispatch({ type: questionTypes.GET_USERQUESTION_REQUEST });
      questionService.getUserQuestions(queryString).then(
         (data) => {
            dispatch({ type: questionTypes.GET_USERQUESTION_SUCCESS, data });
         },
         (error) => {
            dispatch({ type: questionTypes.GET_USERQUESTION_FAILURE });
         }
      );
   };
};

const getAllQuestions = () => {
   return (dispatch) => {
      dispatch({ type: questionTypes.GET_QUESTION_REQUEST });
      questionService.getAllQuestions().then(
         (data) => {
            dispatch({ type: questionTypes.GET_QUESTION_SUCCESS, data });
         },
         (error) => {
            dispatch({ type: questionTypes.GET_QUESTION_FAILURE });
         }
      );
   };
};

const deleteQuestion = (id) => {
   return (dispatch) => {
      console.log(questionTypes);
      dispatch({ type: questionTypes.DELETE_QUESTION_REQUEST });
      questionService.deleteQuestion(id).then(
         (data) => {
            dispatch({ type: questionTypes.DELETE_QUESTION_SUCCESS });
         },
         (error) => {
            dispatch({ type: questionTypes.DELETE_QUESTION_FAILURE });
         }
      );
   };
};
const updateQuestion = (id, data) => {
   return (dispatch) => {
      dispatch({ type: questionTypes.UPDATE_QUESTION_REQUEST });
      questionService.updateQuestion(id, data).then(
         (data) => {
            dispatch({ type: questionTypes.UPDATE_QUESTION_SUCCESS });
         },
         (error) => {
            dispatch({ type: questionTypes.UPDATE_QUESTION_FAILURE });
         }
      );
   };
};

const updateAnswer = (id, data) => {
   return (dispatch) => {
      dispatch({ type: questionTypes.UPDATE_ANSWER_REQUEST });
      questionService.updateAnswer(id, data).then(
         (data) => {
            dispatch({ type: questionTypes.UPDATE_ANSWER_SUCCESS });
         },
         (error) => {
            dispatch({ type: questionTypes.UPDATE_ANSWER_FAILURE });
         }
      );
   };
};

const getAnswer = (id) => {
   return (dispatch) => {
      dispatch({ type: questionTypes.GET_ANSWER_REQUEST });
      questionService.getAnswer(id).then(
         (data) => {
            dispatch({ type: questionTypes.GET_ANSWER_SUCCESS, data });
         },
         (error) => {
            dispatch({ type: questionTypes.GET_ANSWER_FAILURE });
         }
      );
   };
};

const resetAnswerState = () => {
   return {
      type: questionTypes.RESET_ANSWER_STATE,
   };
};

const questionStateChanger = () => ({
   type: questionTypes.QUESTION_STATE_CHANGER,
});

export default {
   resetAnswerState,
   getStandardCode,
   getReviewers,
   getUserQuestions,
   getAllQuestions,
   getAnswer,
   createQuestion,
   createAnswer,
   deleteQuestion,
   updateQuestion,
   updateAnswer,
   questionStateChanger,
};
