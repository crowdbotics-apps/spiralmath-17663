import handleResponse from "../../helpers/handleResponse";
import authHeader from "../../helpers/authHeader";

const get_message_user_list = () => {
   const requestOptions = {
      method: "GET",
      headers: authHeader(),
   };
   return fetch("api/v1/user/short-list/", requestOptions).then(handleResponse);
};

const get_messages_id = () => {
   const requestOptions = {
      method: "GET",
      headers: authHeader(),
   };
   return fetch("api/v1/messages/", requestOptions).then(handleResponse);
};

const send_message = (data) => {
   const requestOptions = {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
   };
   return fetch("api/v1/messages/send/", requestOptions).then(handleResponse);
};

const get_single_user_messages = (id) => {
   const requestOptions = {
      method: "GET",
      headers: authHeader(),
   };
   return fetch(`api/v1/messages/${id}/load/`, requestOptions).then(
      handleResponse
   );
};

export default {
   get_message_user_list,
   get_messages_id,
   get_single_user_messages,
   send_message,
};
