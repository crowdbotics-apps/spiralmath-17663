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

export default {
  upload_file,
};
