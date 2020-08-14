import messageTypes from "./message.types";

const initialState = {
  userList: [],
  loadUserList: false,
  errorUserList: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case messageTypes.GET_MESSAGE_USER_LIST_REQUEST:
      return { ...state, loadUserList: true, errorUserList: "" };
    case messageTypes.GET_MESSAGE_USER_LIST_SUCCESS:
      return { ...state, userList: action.payload, loadUserList: false };
    case messageTypes.GET_MESSAGE_USER_LIST_FAILURE:
      return { ...state, loadUserList: false, errorUserList: action.payload };
    default:
      return state;
  }
};
