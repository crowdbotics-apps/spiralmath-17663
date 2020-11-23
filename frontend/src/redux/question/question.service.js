import handleResponse from '../../helpers/handleResponse';
import authHeader from '../../helpers/authHeader';
import { uploadHeader } from './../../helpers/utils';

const getStandardCode = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(`api/v1/settings/standard-code/`, requestOptions).then(handleResponse);
};

const getReviewers = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(`api/v1/user/reviewers-list/`, requestOptions).then(handleResponse);
};

const getCreators = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(`api/v1/creator/`, requestOptions).then(handleResponse);
};

const createQuestion = (formData) => {
	const requestOptions = {
		method: 'POST',
		headers: uploadHeader(),
		body: formData,
	};
	return fetch('api/v1/question/', requestOptions).then(handleResponse);
};

const createAnswer = (data) => {
	const requestOptions = {
		method: 'POST',
		headers: authHeader(),
		body: JSON.stringify(data),
	};
	return fetch('api/v1/answer/', requestOptions).then(handleResponse);
};

const getUserQuestions = (queryString) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};

	return fetch(`api/v1/question?${queryString}&deleted=false&ordering=descending`, requestOptions).then(
		handleResponse
	);
};

const getAllQuestions = () => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch('api/v1/question?deleted=false&ordering=descending', requestOptions).then(handleResponse);
};

const getAnswer = (id) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(`api/v1/question/${id}/answers/`, requestOptions).then(handleResponse);
};

const getSingleQuestion = (id) => {
	const requestOptions = {
		method: 'GET',
		headers: authHeader(),
	};
	return fetch(`api/v1/question/${id}/`, requestOptions).then(handleResponse);
};

const deleteQuestion = (id) => {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader(),
	};
	return fetch(`api/v1/question/${id}/`, requestOptions).then(handleResponse);
};

const updateQuestion = (id, data, isReview = false) => {
	const requestOptions = {
		method: 'PATCH',
		headers: isReview ? { ...uploadHeader(), 'Content-Type': 'application/json' } : uploadHeader(),
		body: isReview ? JSON.stringify(data) : data,
	};

	return fetch(`api/v1/question/${id}/`, requestOptions).then(handleResponse);
};

const updateAnswer = (id, data) => {
	const requestOptions = {
		method: 'PATCH',
		headers: authHeader(),
		body: JSON.stringify(data),
	};

	return fetch(`api/v1/answer/${id}/`, requestOptions).then(handleResponse);
};

export default {
	updateQuestion,
	updateAnswer,
	deleteQuestion,
	getUserQuestions,
	getAllQuestions,
	getStandardCode,
	getReviewers,
	getCreators,
	getAnswer,
	createQuestion,
	getSingleQuestion,
	createAnswer,
};
