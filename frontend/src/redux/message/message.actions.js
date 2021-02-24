import messageTypes from "./message.types";
import messageService from "./message.services";
// import { alertActions } from "../user/user.actions";

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

const get_messages_id = () => {
   return (dispatch) => {
      dispatch({ type: messageTypes.GET_MESSAGES_ID_REQUEST });
      messageService.get_messages_id().then(
         (data) =>
            dispatch({
               type: messageTypes.GET_MESSAGES_ID_SUCCESS,
               payload: data,
            }),
         (error) =>
            dispatch({
               type: messageTypes.GET_MESSAGES_ID_FAILURE,
               payload: error,
            })
      );
   };
};

const send_message = (data) => {
   return (dispatch) => {
      dispatch({ type: messageTypes.SEND_MESSAGE_REQUEST });
      messageService.send_message(data).then(
         (data) => dispatch({ type: messageTypes.SEND_MESSAGE_SUCCESS }),
         (error) => dispatch({ type: messageTypes.SEND_MESSAGE_FAILURE })
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
               payload: data.details.content,
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
   get_messages_id,
   get_single_user_messages,
   send_message,
};
