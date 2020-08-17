import messageTypes from "./message.types";

const initialState = {
  userList: [],
  loadUserList: false,
  errorUserList: "",
  userMessageList: [],
  loadUserMessageList: false,
  errorUserMessageList: "",
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
    default:
      return state;
  }
};
