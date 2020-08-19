import handleResponse from "../../helpers/handleResponse";
import requestOptions from "../../helpers/requestOptions";

const upload_file = (data) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
    body: data,
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/upload/",
    requestOptionsModified
  ).then(handleResponse);
};

const upload_terms = (data) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "PATCH",
    body: data,
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/",
    requestOptionsModified
  ).then(handleResponse);
};
const upload_emails = (data) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "PATCH",
    body: data,
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/",
    requestOptionsModified
  ).then(handleResponse);
};

export default {
  upload_file,
};
