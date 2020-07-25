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
        history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

const logout = () => {
  userService.logout();
  return { type: userTypes.LOGOUT };
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

export const alertActions = {
  success,
  error,
  clear,
};

export const userActions = {
  login,
  logout,
  register,
};
