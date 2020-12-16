import questionTypes from './question.type';
import questionFormStateTypes from '../questionFormState/questionFormState.type';
import questionService from './question.service';
import { questionFormStateEdit } from '../questionFormState/questionFormState.action';
import { setQuestionType } from '../local/local.actions';




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
			dispatch({
				type: questionTypes.GET_REVIEWERS_SUCCESS,
				payload: data.detail,
			});
		});
	};
};

const getCreators = () => {
	return (dispatch) => {
		questionService.getCreators().then((data) => {
			dispatch({
				type: questionTypes.GET_CREATORS_SUCCESS,
				payload: data.results,
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
const updateQuestion = (id, data, isReview = false) => {
	return (dispatch) => {
		dispatch({ type: questionTypes.UPDATE_QUESTION_REQUEST });
		questionService.updateQuestion(id, data, isReview).then(
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
				dispatch({
					type: questionFormStateTypes.EDIT_ANSWER_TRUE,
					data: data.details[0],
				});
			},
			(error) => {
				dispatch({ type: questionTypes.GET_ANSWER_FAILURE });
			}
		);
	};
};

const questionStateChanger = () => ({
	type: questionTypes.QUESTION_STATE_CHANGER,
});

const getSingleQuestion = (id) => {
	return (dispatch) => {
		dispatch({ type: questionTypes.GET_SINGLE_QUESTION_REQUEST });
		questionService.getSingleQuestion(id).then(
			(data) => {
				console.log(data);
				dispatch(questionFormStateEdit(data));
				dispatch(setQuestionType(data.question_type));
			},
			(error) => {
				dispatch({ type: questionTypes.GET_SINGLE_QUESTION_FAILURE });
			}
		);
	};
};

export default {
	getStandardCode,
	getReviewers,
	getCreators,
	getUserQuestions,
	getAllQuestions,
	getAnswer,
	createQuestion,
	createAnswer,
	deleteQuestion,
	updateQuestion,
	updateAnswer,
	questionStateChanger,
	getSingleQuestion,
};
