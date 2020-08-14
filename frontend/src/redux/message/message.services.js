import handleResponse from "../../helpers/handleResponse";
import authHeader from "../../helpers/authHeader";

const get_message_user_list = () => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: authHeader(),
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/user/short-list/",
    requestOptions
  ).then(handleResponse);
};
const send_message = (data) => {
  const requestOptions = {
    method: "POST",
    credentials: "include",
    headers: authHeader(),
    body: data,
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/messages/send/",
    requestOptions
  ).then(handleResponse);
};

export default {
  get_message_user_list,
};
