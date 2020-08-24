import handleResponse from "../../helpers/handleResponse";
import requestOptions from "../../helpers/requestOptions";

const upload_file = (data) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
    headers: {
      ...requestOptions.headers,
      "Content-Type": "multipart/form-data",
    },
    body: data,
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/upload/",
    requestOptionsModified
  ).then(handleResponse);
};

const upload_terms = (data) => {
  const request = {
    path: "terms-condition",
    value: data,
  };
  const requestOptionsModified = {
    ...requestOptions,
    method: "PATCH",
    body: request,
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/",
    requestOptionsModified
  ).then(handleResponse);
};

const upload_emails = (data) => {
  const request = {
    path: "emails",
    value: JSON.stringify(data),
  };

  const requestOptionsModified = {
    ...requestOptions,
    method: "PATCH",
    body: request,
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/",
    requestOptionsModified
  ).then(handleResponse);
};

const get_settings = () => {
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/",
    requestOptions
  ).then(handleResponse);
};

export default {
  upload_file,
  upload_emails,
  upload_terms,
  get_settings,
};
