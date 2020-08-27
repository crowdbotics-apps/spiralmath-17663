import handleResponse from "../../helpers/handleResponse";
import requestOptions from "../../helpers/requestOptions";

const upload_file = (data) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
    headers: {
      "X-CSRFTOKEN": requestOptions.headers["X-CSRFTOKEN"],
      "Accept-Language": requestOptions.headers["Accept-Language"],
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
    body: JSON.stringify(request),
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/1",
    requestOptionsModified
  ).then(handleResponse);
};

const upload_non_registered = (data) => {
  const request = {
    path: "non-registered-email",
    value: data.non_registered,
  };

  const requestOptionsModified = {
    ...requestOptions,
    method: "PATCH",
    body: JSON.stringify(request),
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/2",
    requestOptionsModified
  ).then(handleResponse);
};
const upload_registered = (data) => {
  const request = {
    path: "registered-email",
    value: data.registered,
  };
  console.log("Req", request);

  const requestOptionsModified = {
    ...requestOptions,
    method: "PATCH",
    body: JSON.stringify(request),
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/3",
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
  upload_non_registered,
  upload_registered,
  upload_terms,
  get_settings,
};
