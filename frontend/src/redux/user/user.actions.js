import Cookies from "js-cookie";
import { alertTypes, userTypes } from "./user.types";
import userService from "./user.services";

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
      dispatch(request());

      userService
         .login(email, password)
         .then((user) => {
            dispatch(success(user));
         })
         .catch((error) => {
            dispatch(failure(error.detail));
            console.log(error);
            dispatch(alertActions.error(error.detail));
         });
   };
};

const logout = () => {
   return (dispatch) => {
      userService
         .logout()
         .catch((error) => dispatch(alertActions.error(error.detail)));
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
            console.log("User", user);
            dispatch(success());
            dispatch(alertActions.success("Registration successful"));
         },
         (error) => {
            console.log("Error1:", error);
            const key = Object.keys(error)[0];
            error = { key, message: error[key][0] };
            console.log("Error2", error);
            dispatch(failure(error));
            dispatch(alertActions.error(error.detail));
         }
      );
   };
};

const confirmUser = (user) => {
   const request = () => {
      return { type: userTypes.CONFIRMATION_REQUEST };
   };
   const success = (user) => {
      return { type: userTypes.LOGIN_SUCCESS, user };
   };
   const failure = (error) => {
      return { type: userTypes.CONFIRMATION_FAILURE, error };
   };

   return (dispatch) => {
      Cookies.remove("csrftoken");
      localStorage.removeItem("user");
      dispatch(request());
      userService.confirmUser(user).then(
         (user) => {
            dispatch(success(user));
            dispatch(alertActions.success("Registration successful"));
         },
         (error) => {
            dispatch(failure(error.detail));
            dispatch(alertActions.error(error.detail));
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
         () => {
            dispatch(success());
            dispatch(
               alertActions.success("Password reset link sent successfully")
            );
         },
         (error) => {
            dispatch(failure(error.detail));
            dispatch(alertActions.error(error.detail));
         }
      );
   };
};
const resetUserPassword = (data) => {
   const request = () => {
      return { type: userTypes.RESET_PASSWORD_REQUEST };
   };
   const success = () => {
      return { type: userTypes.RESET_PASSWORD_SUCCESS };
   };
   const failure = (error) => {
      return { type: userTypes.RESET_PASSWORD_FAILURE, error };
   };

   return (dispatch) => {
      dispatch(request());

      userService.resetUserPassword(data).then(
         () => {
            dispatch(success());
            dispatch(alertActions.success("Password reset successfully"));
         },
         (error) => {
            dispatch(failure(error.detail));
            dispatch(alertActions.error(error.detail));
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

      userService.contactUs({ email, message }).then(
         () => {
            dispatch(success());
            dispatch(
               alertActions.success("Your message was sent successfully")
            );
         },
         (error) => {
            dispatch(failure(error.detail));
            dispatch(alertActions.error(error.detail));
         }
      );
   };
};

const getAllUsers = (pageNumber) => {
   function request() {
      return { type: userTypes.GETALL_USERS_REQUEST };
   }
   function success(users) {
      return {
         type: userTypes.GETALL_USERS_SUCCESS,
         payload: {
            count: users.count,
            users: users.results || [],
         },
      };
   }
   function failure(error) {
      return { type: userTypes.GETALL_USERS_FAILURE, payload: error };
   }

   return (dispatch) => {
      dispatch(request());

      userService.getAllUsers(pageNumber).then(
         (users) => dispatch(success(users)),
         (error) => dispatch(failure(error.detail))
      );
   };
};

const updateUser = (user) => {
   const request = () => {
      return { type: userTypes.UPDATE_USER_REQUEST };
   };
   const success = () => {
      return { type: userTypes.UPDATE_USER_SUCCESS };
   };
   const failure = (error) => {
      return { type: userTypes.UPDATE_USER_FAILURE, payload: error };
   };

   return (dispatch) => {
      dispatch(request());

      userService.updateUser(user).then(
         (user) => {
            dispatch(alertActions.success("User updated successfully"));
            dispatch(success());
         },
         (error) => {
            dispatch(failure(error.detail));
         }
      );
   };
};

const updateUserStatus = (user) => {
   return (dispatch) => {
      userService.updateUser(user).then(
         (user) => {},
         (error) => {}
      );
   };
};

const deleteUser = (id) => {
   const request = () => {
      return { type: userTypes.DELETE_USER_REQUEST };
   };
   const success = () => {
      return { type: userTypes.DELETE_USER_SUCCESS, payload: id };
   };
   const failure = (error) => {
      return { type: userTypes.DELETE_USER_FAILURE, payload: error };
   };

   return (dispatch) => {
      dispatch(request());

      userService.deleteUser(id).then(
         () => {
            dispatch(success(id));
            dispatch(alertActions.success("User deleted successfully"));
         },
         (error) => {
            dispatch(alertActions.error(error.detail));
            dispatch(failure(error.detail));
         }
      );
   };
};

const getAllUserTypes = () => {
   return (dispatch) => {
      dispatch(request());
      userService.getAllUserTypes().then(
         (comingUserTypes) => dispatch(success(comingUserTypes)),
         (error) => dispatch(failure(error.detail))
      );
   };

   function request() {
      return { type: userTypes.GETALL_USER_TYPES };
   }
   function success(comingUserTypes) {
      return {
         type: userTypes.GETALL_USER_TYPES_SUCCESS,
         payload: comingUserTypes.results,
      };
   }
   function failure(error) {
      return { type: userTypes.GETALL_USER_TYPES_FAILURE, payload: error };
   }
};

const createUserType = (user) => {
   const request = () => {
      return { type: userTypes.CREATE_USER_TYPE };
   };
   const success = () => {
      return { type: userTypes.CREATE_USER_TYPE_SUCCESS };
   };
   const failure = (error) => {
      return { type: userTypes.CREATE_USER_TYPE_FAILURE, payload: error };
   };

   return (dispatch) => {
      dispatch(request());

      userService.createUserType(user).then(
         () => {
            dispatch(success());
            dispatch(alertActions.success("User Type created successfully."));
         },
         (error) => {
            dispatch(failure(error.detail));
         }
      );
   };
};

const updateUserType = (userTypeObject) => {
   const request = () => {
      return { type: userTypes.UPDATE_USER_TYPE };
   };
   const success = () => {
      return { type: userTypes.UPDATE_USER_TYPE_SUCCESS };
   };
   const failure = (error) => {
      return { type: userTypes.UPDATE_USER_TYPE_FAILURE, payload: error };
   };

   return (dispatch) => {
      dispatch(request());

      userService.updateUserType(userTypeObject).then(
         () => {
            dispatch(alertActions.success("User Type updated successfully."));
            dispatch(success());
         },
         (error) => {
            dispatch(failure(error.detail));
         }
      );
   };
};

const deleteUserType = (id) => {
   const request = () => {
      return { type: userTypes.DELETE_USER_TYPE };
   };
   const success = (id) => {
      return { type: userTypes.DELETE_USER_TYPE_SUCCESS, payload: id };
   };
   const failure = (error) => {
      return { type: userTypes.DELETE_USER_TYPE_FAILURE, payload: error };
   };

   return (dispatch) => {
      dispatch(request());

      userService.deleteUserType(id).then(
         () => {
            dispatch(alertActions.success("User Type deleted successfully."));
            dispatch(success(id));
         },
         (error) => {
            dispatch(alertActions.error("User Type deleted failed"));
            dispatch(failure(error.detail));
         }
      );
   };
};

export const getSettings = () => {
   return (dispatch) => {
      userService.settings().then((settings) => {
         dispatch({ type: "GET_SETTINGS", settings });
      });
   };
};

const sendInvitation = (id) => {
   return (dispatch) => {
      userService.sendInvitation(id).then(
         () =>
            dispatch(
               alertActions.success(
                  "Invitation instructions have been sent to the user"
               )
            ),
         () => dispatch(alertActions.error("Sending Ivitation Failed ! Retry"))
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
   getAllUsers,
   updateUser,
   updateUserStatus,
   deleteUser,
   confirmUser,
   sendInvitation,
   resetPassword,
   resetUserPassword,
   contactUs,
   createUserType,
   getAllUserTypes,
   updateUserType,
   deleteUserType,
   getSettings,
};
