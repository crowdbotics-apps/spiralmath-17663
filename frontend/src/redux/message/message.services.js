import handleResponse from "../../helpers/handleResponse";
import requestOptions from "../../helpers/requestOptions";

const get_message_user_list = () => {
   return fetch("api/v1/user/short-list/", requestOptions).then(handleResponse);
};

const get_messages_id = () => {
   return fetch("api/v1/messages/", requestOptions).then(handleResponse);
};

const send_message = (data) => {
   const requestOptionsModified = {
      ...requestOptions,
      method: "POST",
      body: JSON.stringify(data),
   };
   return fetch("api/v1/messages/send/", requestOptionsModified).then(
      handleResponse
   );
};

const get_single_user_messages = (id) => {
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
