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
    deletingUserType: false,
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
    case userTypes.GETALL_USER_TYPES:
      return { ...state, loadingUserTypes: true, error: "" };
    case userTypes.GETALL_USER_TYPES_SUCCESS:
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
    case userTypes.DELETE_USER_TYPE:
      return { ...state, deletingUserType: true, error: "", success: "" };
    case userTypes.DELETE_USER_TYPE_SUCCESS:
      const allUserTypes = state.allUserTypes.filter(
        (el) => el.id !== action.payload
      );
      return {
        ...state,
        allUserTypes,
        deletingUserType: false,
        success: `UserType with id ${action.payload} is successfully deleted`,
      };
    case userTypes.DELETE_USER_TYPE_FAILURE:
      return { ...state, deletingUserType: false, error: action.payloads };
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
  users: [],
  loadingUsers: false,
  updatingUser: false,
  deletingUser: false,
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
        users: action.users,
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
    case userTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        deletingUser: true,
        errorMessage: "",
        successMessage: "",
      };
    case userTypes.DELETE_USER_SUCCESS:
      const users = state.users.filter((el) => el.id !== action.payload);
      return {
        ...state,
        users,
        deletingUser: false,
        successMessage: `User with id ${action.payload} is successfully deleted`,
      };
    case userTypes.DELETE_USER_FAILURE:
      return { ...state, deletingUser: false, errorMessage: action.payload };
    default:
      return state;
  }
};
