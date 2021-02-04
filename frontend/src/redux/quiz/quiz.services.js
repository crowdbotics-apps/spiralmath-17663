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

export default {
  getAllQuizzes,
};
