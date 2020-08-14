import handleResponse from "../../helpers/handleResponse";
import authHeader from "../../helpers/authHeader";

const upload_file = (data) => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: authHeader(),
    body: data,
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/settings/upload/",
    requestOptions
  ).then(handleResponse);
};

export default {
  upload_file,
};
