import handleResponse from "../../helpers/handleResponse";
import authHeader from "../../helpers/authHeader";
import { uploadHeader } from "./../../helpers/utils";

const getStandardCode = () => {
   const requestOptions = {
      method: "GET",
      headers: authHeader(),
   };
   return fetch(`api/v1/settings/standard-code/`, requestOptions).then(
      handleResponse
   );
};

const createQuestion = (formData) => {
   const requestOptions = {
      method: "POST",
      headers: uploadHeader(),
      body: formData,
   };
   return fetch("api/v1/question/", requestOptions).then(handleResponse);
};

const createAnswer = (data) => {
   const requestOptions = {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
   };
   return fetch("api/v1/answer/", requestOptions).then(handleResponse);
};

const getUserQuestions = (queryString) => {
   const requestOptions = {
      method: "GET",
      headers: authHeader(),
   };

   return fetch(`api/v1/question?${queryString}`, requestOptions).then(
      handleResponse
   );
};

const getAllQuestions = () => {
   const requestOptions = {
      method: "GET",
      headers: authHeader(),
   };
   return fetch("api/v1/question/", requestOptions).then(handleResponse);
};

const getAnswer = (id) => {
   const requestOptions = {
      method: "GET",
      headers: authHeader(),
   };
   return fetch(`api/v1/question/${id}/answers/`, requestOptions).then(
      handleResponse
   );
};

const deleteQuestion = (id) => {
   const requestOptions = {
      method: "DELETE",
      headers: authHeader(),
   };
   return fetch(`api/v1/question/${id}/`, requestOptions).then(handleResponse);
};

const updateQuestion = (id, data) => {
   const requestOptions = {
      method: "PATCH",
      headers: uploadHeader(),
      body: data,
   };

   return fetch(`api/v1/question/${id}/`, requestOptions).then(handleResponse);
};

const updateAnswer = (id, data) => {
   const requestOptions = {
      method: "PATCH",
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
   getAnswer,
   createQuestion,
   createAnswer,
};
