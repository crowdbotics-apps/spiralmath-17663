import messageTypes from "./message.types";
import messageService from "./message.services";
import { alertActions } from "../user/user.actions";

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

const send_message = (data) => {
  return (dispatch) => {
    messageService.send_message(data).then(
      (data) => dispatch(alertActions.success("message sent successfully")),
      (error) => dispatch(alertActions.error(error.detail))
    );
  };
};

const get_single_user_messages = (id) => {
  return (dispatch) => {
    dispatch({ type: messageTypes.GET_SINGLE_USER_MESSAGES_REQUEST });
    messageService.get_single_user_messages(id).then(
      (data) => {
        dispatch({
          type: messageTypes.GET_SINGLE_USER_MESSAGES_SUCCESS,
          payload: data.content,
        });
      },
      (error) => {
        dispatch({
          type: messageTypes.GET_SINGLE_USER_MESSAGES_FAILURE,
          payload: error,
        });
      }
    );
  };
};

export default {
  get_message_user_list,
  get_single_user_messages,
  send_message,
};
