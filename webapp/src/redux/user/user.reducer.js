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

export const confirmation = (state = {}, action) => {
  switch (action.type) {
    case userTypes.CONFIRMATION_REQUEST:
      return { confirming: true };
    case userTypes.CONFIRMATION_SUCCESS:
      return {};
    case userTypes.CONFIRMATION_FAILURE:
      return {};
    default:
      return state;
  }
};

export const reset = (state = {}, action) => {
  switch (action.type) {
    case userTypes.RESET_REQUEST:
      return { reseting: true };
    case userTypes.RESET_SUCCESS:
      return {};
    case userTypes.RESET_FAILURE:
      return {};
    default:
      return state;
  }
};

export const contactUs = (state = {}, action) => {
  switch (action.type) {
    case userTypes.CONTACT_REQUEST:
      return { contacting: true };
    case userTypes.CONTACT_SUCCESS:
      return {};
    case userTypes.CONTACT_FAILURE:
      return {};
    default:
      return state;
  }
};

let initialUsersState = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 15,
      email: "testing-editor@example.com",
      first_name: "testing-editor",
      last_name: "testing-editor",
      user_type: null,
      role: "Editor",
      status: 10,
      username: "testing-editor@example.com",
    },
    {
      id: 1,
      email: "david.robson@spiralmath.net",
      first_name: "david",
      last_name: "robson",
      user_type: null,
      role: "Admin",
      status: 10,
      username: "david.robson@spiralmath.net",
    },
    {
      id: 10,
      email: "idigitalbrick@gmail.com",
      first_name: "test-admin",
      last_name: "test-admin",
      user_type: null,
      role: "Admin",
      status: 10,
      username: "idigitalbrick@gmail.com",
    },
  ],
};

export const users = (state = initialUsersState, action) => {
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
