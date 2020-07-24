import { alertTypes, userTypes } from "./user.types";

export const alertTypes = {
  success,
  error,
  clear,
};

success = (message) => {
  return { type: alertTypes.SUCCESS, message };
};

error = (message) => {
  return { type: alertTypes.ERROR, message };
};

clear = () => {
  return { type: alertTypes.CLEAR };
};

export const userActions = {
  login,
  logout,
  register,
};

login = (email, password) => {
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

  request = (user) => {
    return { type: userTypes.LOGIN_REQUEST, user };
  };
  success = (user) => {
    return { type: userTypes.LOGIN_SUCCESS, user };
  };
  failure = (error) => {
    return { type: userTypes.LOGIN_FAILURE, error };
  };
};

logout = () => {
  userService.logout();
  return { type: userTypes.LOGOUT };
};

signup = (user) => {
  return (dispatch) => {
    dispatch(request(user));

    userService.signup(user).then(
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

  request = (user) => {
    return { type: userTypes.REGISTER_REQUEST, user };
  };
  success = (user) => {
    return { type: userTypes.REGISTER_SUCCESS, user };
  };
  failure = (error) => {
    return { type: userTypes.REGISTER_FAILURE, error };
  };
};
