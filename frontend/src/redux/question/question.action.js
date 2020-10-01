import questionTypes from "./question.type";
import questionService from "./question.service";

const getStandardCode = () => {
   return (dispatch) => {
      questionService.getStandardCode().then((data) => {
         console.log(data);
         dispatch({
            type: questionTypes.GETSTANDARDCODE_SUCCESS,
            payload: data.detail,
         });
      });
   };
};

const createQuestion = () => {
   return (dispatch) => {
      dispatch({ type: questionTypes.CREATE_QUESTION_REQUEST });
      questionService.createQuestion().then(
         (data) => {
            dispatch({ type: questionTypes.CREATE_QUESTION_SUCCESS });
         },
         (error) => {
            dispatch({ type: questionTypes.CREATE_QUESTION_FAILURE });
         }
      );
   };
};

const createAnswer = () => {
   return (dispatch) => {
      dispatch({ type: questionTypes.CREATE_ANSWER_REQUEST });
      questionService.createAnswer().then(
         (data) => {
            dispatch({ type: questionTypes.CREATE_ANSWER_SUCCESS });
         },
         (error) => {
            dispatch({ type: questionTypes.CREATE_ANSWER_FAILURE });
         }
      );
   };
};

const getUserQuestions = () => {
   return (dispatch) => {
      dispatch({ type: questionTypes.GET_USERQUESTION_REQUEST });
      questionService.getUserQuestions().then(
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

const questionStateChanger = () => ({
   type: questionTypes.QUESTION_STATE_CHANGER,
});

export default {
   getStandardCode,
   getUserQuestions,
   getAllQuestions,
   createQuestion,
   createAnswer,
   deleteQuestion,
   updateQuestion,
   questionStateChanger,
};
