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

const confirmUser = (user) => {
  const request = () => {
    return { type: userTypes.CONFIRMATION_REQUEST };
  };
  const success = (user) => {
    return { type: userTypes.CONFIRMATION_SUCCESS, user };
  };
  const failure = (error) => {
    return { type: userTypes.CONFIRMATION_FAILURE, error };
  };

  return (dispatch) => {
    dispatch(request());

    userService.confirmUser(user).then(
      (user) => {
        dispatch(success());
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

const resetPassword = (email) => {
  const request = () => {
    return { type: userTypes.RESET_REQUEST };
  };
  const success = () => {
    return { type: userTypes.RESET_SUCCESS };
  };
  const failure = (error) => {
    return { type: userTypes.RESET_FAILURE, error };
  };

  return (dispatch) => {
    dispatch(request());

    userService.resetPassword(email).then(
      (email) => {
        dispatch(success());
        dispatch(alertActions.success("Reset password successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
};

export const contactUs = (email, message) => {
  const request = () => {
    return { type: userTypes.CONTACT_REQUEST };
  };
  const success = (data) => {
    return { type: userTypes.CONTACT_SUCCESS, data };
  };
  const failure = (error) => {
    return { type: userTypes.CONTACT_FAILURE, error };
  };

  return (dispatch) => {
    dispatch(request());

    userService.contactUs(email, message).then(
      (data) => {
        dispatch(success(data));
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
  confirmUser,
  resetPassword,
  contactUs,
};
