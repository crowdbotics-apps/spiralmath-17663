import authHeader from "../../helpers/authHeader";
import handleResponse from "../../helpers/handleResponse";

const getAllQuizzes = (pageNumber) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `api/v1/quiz/?limit=5&offset=${pageNumber}`,
    requestOptions
  ).then(handleResponse);
};

const deleteQuiz = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  return fetch(`api/v1/quiz/${id}/`, requestOptions).then(handleResponse);
};

const editQuiz = (id, data) => {
  const requestOptions = {
    method: "PATCH",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`api/v1/quiz/${id}`, requestOptions).then(handleResponse);
};

const createQuiz = (data) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  return fetch(`api/v1/quiz/`, requestOptions).then(handleResponse);
};

const getQuiz = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`api/v1/quiz/${id}`, requestOptions).then(handleResponse);
};

export default {
  getAllQuizzes,
  createQuiz,
  deleteQuiz,
  editQuiz,
  getQuiz,
};
