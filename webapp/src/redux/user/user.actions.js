import { alertTypes, userTypes } from "./user.types";
import { userService } from "./user.service";
import { history } from "../../helpers/history";

const success = (message) => {
  return { type: alertTypes.SUCCESS, message };
};

const error = (message) => {
  return { type: alertTypes.ERROR, message };
};

const clear = () => {
  return { type: alertTypes.CLEAR };
};

const login = (email, password) => {
  const request = (user) => {
    return { type: userTypes.LOGIN_REQUEST, user };
  };
  const success = (user) => {
    return { type: userTypes.LOGIN_SUCCESS, user };
  };
  const failure = (error) => {
    return { type: userTypes.LOGIN_FAILURE, error };
  };

  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

const logout = () => {
  return (dispatch) => {
    userService
      .logout()
      .catch((error) => dispatch(alertActions.error(error.toString())));
    dispatch({ type: userTypes.LOGOUT });
  };
};

const register = (user) => {
  const request = (user) => {
    return { type: userTypes.REGISTER_REQUEST, user };
  };
  const success = (user) => {
    return { type: userTypes.REGISTER_SUCCESS, user };
  };
  const failure = (error) => {
    return { type: userTypes.REGISTER_FAILURE, error };
  };

  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

const getAllUsers = () => {
  return (dispatch) => {
    dispatch(request());

    userService.getAllUsers().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userTypes.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userTypes.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userTypes.GETALL_FAILURE, error };
  }
};

export const alertActions = {
  success,
  error,
  clear,
};

export const userActions = {
  login,
  logout,
  register,
  getAllUsers,
};
