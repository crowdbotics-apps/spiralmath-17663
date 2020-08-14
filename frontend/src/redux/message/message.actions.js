import messageTypes from "./message.types";
import messageService from "./message.services";

const get_message_user_list = () => {
  return (dispatch) => {
    dispatch({ type: messageTypes.GET_MESSAGE_USER_LIST_REQUEST });
    messageService.get_message_user_list().then(
      (data) =>
        dispatch({
          type: messageTypes.GET_MESSAGE_USER_LIST_SUCCESS,
          payload: data.detail,
        }),
      (error) =>
        dispatch({
          type: messageTypes.GET_MESSAGE_USER_LIST_FAILURE,
          payload: error,
        })
    );
  };
};

export default {
  get_message_user_list,
};
