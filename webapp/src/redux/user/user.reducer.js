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

const localStorageUser = localStorage.getItem("user");
let user =
  localStorageUser !== "undefined" ? JSON.parse(localStorageUser) : null;
const initialState = user
  ? { loggedIn: true, user, loggingIn: false, error: "" }
  : { loggedIn: false, loggingIn: false, user: {}, error: "" };

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: "",
        loggingIn: true,
      };
    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        error: "",
        user: action.user,
      };
    case userTypes.LOGIN_FAILURE:
      return { ...state, error: action.payload, loggingIn: false };
    case userTypes.LOGOUT:
      return { ...state, loggedIn: false };
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
export const userTypesReducer = (
  state = {
    userTypeCreating: false,
    allUserTypes: [],
    loadingUserTypes: false,
    error: "",
    success: "",
    updatingUserType: false,
  },
  action
) => {
  switch (action.type) {
    case userTypes.CREATE_USER_TYPE:
      return { ...state, userTypeCreating: true, error: "" };
    case userTypes.CREATE_USER_TYPE_SUCCESS:
      return { ...state, userTypeCreating: false, error: "" };
    case userTypes.CREATE_USER_TYPE_FAILURE:
      return { ...state, userTypeCreating: false, error: action.payload };
    case userTypes.GETALL_USER_TYPES_REQUEST:
      return { ...state, loadingUserTypes: true, error: "" };
    case userTypes.GETALL_USER_TYPES:
      return {
        ...state,
        allUserTypes: action.payload,
        loadingUserTypes: false,
      };
    case userTypes.GETALL_USER_TYPES_FAILURE:
      return { ...state, loadingUserTypes: false, error: action.payload };
    case userTypes.UPDATE_USER_TYPE:
      return { ...state, updatingUserType: true, error: "", success: "" };
    case userTypes.UPDATE_USER_TYPE_SUCCESS:
      return {
        ...state,
        updatingUserType: false,
        success: "User type successfully updated",
      };
    case userTypes.UPDATE_USER_TYPE_FAILURE:
      return {
        ...state,
        updatingUserType: false,
        error: action.payload,
      };
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
  users: [
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
  loadingUsers: false,
  updatingUser: false,
  errorMessage: "",
  successMessage: "",
};

export const users = (state = initialUsersState, action) => {
  switch (action.type) {
    case userTypes.GETALL_USERS_REQUEST:
      return {
        ...state,
        loadingUsers: true,
        errorMessage: "",
      };
    case userTypes.GETALL_USERS_SUCCESS:
      return {
        ...state,
        loadingUsers: false,
        users: action.payload,
        errorMessage: "",
      };
    case userTypes.GETALL_USERS_FAILURE:
      return {
        ...state,
        loadingUsers: false,
        errorMessage: action.payload,
      };
    case userTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        updatingUser: true,
        errorMessage: "",
        successMessage: "",
      };
    case userTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updatingUser: false,
        successMessage: "User updated successfully",
      };
    case userTypes.UPDATE_USER_FAILURE:
      return { ...state, updatingUser: false, errorMessage: action.payload };
    default:
      return state;
  }
};
