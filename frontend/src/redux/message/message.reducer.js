import messageTypes from "./message.types";

const initialState = {
  userList: [],
  loadUserList: false,
  errorUserList: "",
  userMessageList: [],
  loadUserMessageList: false,
  errorUserMessageList: "",
  messagesIdList: [],
  loadMessagesIdList: false,
  errorMessagesIdList: "",
  sendingMessage: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case messageTypes.GET_MESSAGE_USER_LIST_REQUEST:
      return { ...state, loadUserList: true, errorUserList: "" };
    case messageTypes.GET_MESSAGE_USER_LIST_SUCCESS:
      return { ...state, userList: action.payload, loadUserList: false };
    case messageTypes.GET_MESSAGE_USER_LIST_FAILURE:
      return { ...state, loadUserList: false, errorUserList: action.payload };
    case messageTypes.GET_SINGLE_USER_MESSAGES_REQUEST:
      return {
        ...state,
        userMessageList: [],
        loadUserMessageList: true,
        errorUserMessageList: "",
      };
    case messageTypes.GET_SINGLE_USER_MESSAGES_SUCCESS:
      return {
        ...state,
        userMessageList: action.payload,
        loadUserMessageList: false,
      };
    case messageTypes.GET_SINGLE_USER_MESSAGES_FAILURE:
      return {
        ...state,
        errorUserMessageList: action.payload,
        loadUserMessageList: false,
      };
    case messageTypes.GET_MESSAGES_ID_REQUEST:
      return { ...state, loadMessagesIdList: true, errorUserList: "" };
    case messageTypes.GET_MESSAGES_ID_SUCCESS:
      return {
        ...state,
        messagesIdList: action.payload.results,
        loadMessagesIdList: false,
      };
    case messageTypes.GET_MESSAGES_ID_FAILURE:
      return {
        ...state,
        loadMessagesIdList: false,
        errorUserList: action.payload,
      };
    case messageTypes.SEND_MESSAGE_REQUEST:
      return { ...state, sendingMessage: true };
    case messageTypes.SEND_MESSAGE_SUCCESS:
      return { ...state, sendingMessage: false };
    case messageTypes.SEND_MESSAGE_FAILURE:
      return { ...state, sendingMessage: false };
    default:
      return state;
  }
};
