import { alertTypes } from "./user.types";
import { userTypes } from "./user.types";

export const alert = (state = {}, action) => {
  switch (action.type) {
    case alertTypes.SUCCESS:
      return {
        type: "alert-success",
        message: action.message,
      };
    case alertTypes.ERROR:
      return {
        type: "alert-danger",
        message: action.message,
      };
    case alertTypes.CLEAR:
      return {};
    default:
      return state;
  }
};

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userTypes.LOGIN_FAILURE:
      return {};
    case userTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};

export const registration = (state = {}, action) => {
  switch (action.type) {
    case userTypes.REGISTER_REQUEST:
      return { registering: true };
    case userTypes.REGISTER_SUCCESS:
      return {};
    case userTypes.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
};

export const users = (state = {}, action) => {
  switch (action.type) {
    case userTypes.GETALL_REQUEST:
      return {
        loading: true,
      };
    case userTypes.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case userTypes.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case userTypes.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case userTypes.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((user) => user.id !== action.id),
      };
    case userTypes.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };
    default:
      return state;
  }
};
