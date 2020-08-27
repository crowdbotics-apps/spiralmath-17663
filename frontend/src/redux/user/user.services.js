import Cookies from "js-cookie";

import requestOptions from "../../helpers/requestOptions";
import handleResponse from "../../helpers/handleResponse";
import { history } from "../../helpers/history";

const login = (email, password) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
    body: JSON.stringify({ email, password }),
  };
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/auth/login/",
    requestOptionsModified
  ).then((res) => {
    return handleResponse(res, false).then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/admin-dashboard");
      return Promise.resolve(user);
    });
  });
};

const logout = () => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
  };
  // remove user from local storage to log user out

  return fetch("api/v1/auth/logout/", requestOptionsModified)
    .then(handleResponse)
    .then(() => {
      localStorage.removeItem("user");
      Cookies.remove("csrftoken");
      history.push("/");
    });
};

const register = (user) => {
  if (user["role"] !== "SystemAdministrator") {
    user["role"] = "Editor";
  } else {
    user["role"] = "Admin";
  }
  const pass = Math.random().toString(36).substring(7);
  const data = {
    email: user["email"],
    first_name: user["first_name"],
    last_name: user["last_name"],
    role: user["role"],
    password: pass,
    user_type: user["user_type"],
  };

  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
    body: JSON.stringify(data),
  };

  return fetch("api/v1/user/", requestOptionsModified).then(handleResponse);
};
const confirmUser = (user) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
    body: JSON.stringify(user),
  };

  return fetch("api/v1/user/confirm-token/", requestOptionsModified).then(
    handleResponse
  );
};

const resetPassword = (email) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
    body: JSON.stringify({ email }),
  };

  return fetch("api/v1/user/reset-password/", requestOptionsModified).then(
    handleResponse
  );
};
const resetUserPassword = (data) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
    body: JSON.stringify(data),
  };

  return fetch("api/v1/user/confirm-token/", requestOptionsModified).then(
    handleResponse
  );
};

export const contactUs = (data) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",
    body: JSON.stringify(data),
  };

  return fetch("api/v1/user/contact-us/", requestOptionsModified).then(
    handleResponse
  );
};

const getAllUserTypes = () => {
  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/user-type/",
    requestOptions
  ).then(handleResponse);
};

const createUserType = (userTypeObject) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",

    body: JSON.stringify(userTypeObject),
  };

  return fetch("api/v1/user-type/", requestOptionsModified).then(
    handleResponse
  );
};

const updateUserType = (userTypeObject) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "PATCH",

    body: JSON.stringify(userTypeObject),
  };

  return fetch(
    `api/v1/user-type/${userTypeObject.id}/`,
    requestOptionsModified
  ).then(handleResponse);
};

const deleteUserType = (id) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "DELETE",
  };

  return fetch(`api/v1/user-type/${id}/`, requestOptionsModified).then(
    handleResponse
  );
};

const getAllUsers = (pageNumber) => {
  return fetch(
    `https://spiralmath-17663.botics.co/api/v1/user/?limit=10&offset=${pageNumber}`,
    requestOptions
  ).then(handleResponse);
};

const updateUser = (user) => {
  if (user["role"] !== "SystemAdministrator") {
    user["role"] = "Editor";
  } else {
    user["role"] = "Admin";
  }
  const requestOptionsModified = {
    method: "PATCH",
    ...requestOptions,
    body: JSON.stringify(user),
  };

  return fetch(`api/v1/user/${user.id}/`, requestOptionsModified).then(
    handleResponse
  );
};

// prefixed function name with underscore because delete is a reserved word in javascript
const deleteUser = (id) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "DELETE",
  };

  return fetch(`api/v1/user/${id}/`, requestOptionsModified).then(
    handleResponse
  );
};

const getOneUser = (id) => {
  return fetch(`api/v1/user/${id}/`, requestOptions).then(handleResponse);
};

const settings = () => {
  return fetch(
    `https://spiralmath-17663.botics.co/api/v1/settings/terms/`,
    requestOptions
  ).then(handleResponse);
};

const sendInvitation = (id) => {
  const requestOptionsModified = {
    ...requestOptions,
    method: "POST",

    body: JSON.stringify({ id }),
  };

  return fetch(`api/v1/user/send-invitation/`, requestOptionsModified).then();
};

export default {
  login,
  logout,
  register,
  getAllUsers,
  updateUser,
  deleteUser,
  getOneUser,
  confirmUser,
  sendInvitation,
  resetPassword,
  resetUserPassword,
  contactUs,
  createUserType,
  getAllUserTypes,
  updateUserType,
  deleteUserType,
  settings,
};
