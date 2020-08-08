import { authHeader } from "../../helpers/auth-header";
import { history } from "../../helpers/history";
import Cookies from "js-cookie";

const login = (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ email, password }),
  };

  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/auth/login/",
    requestOptions
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
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
  // remove user from local storage to log user out

  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/auth/logout/",
    requestOptions
  )
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

  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch("api/v1/user/", requestOptions).then(handleResponse);
};
const confirmUser = (user) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(user),
  };

  return fetch("api/v1/user/confirm-token/", requestOptions).then(
    handleResponse
  );
};

const resetPassword = (email) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ email }),
  };

  return fetch("api/v1/user/reset-password/", requestOptions).then(
    handleResponse
  );
};
const resetUserPassword = (data) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch("api/v1/user/confirm-email/", requestOptions).then(
    handleResponse
  );
};

export const contactUs = (data) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  };

  return fetch("api/v1/user/contact-us/", requestOptions).then(handleResponse);
};

const getAllUserTypes = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/user-type/",
    requestOptions
  ).then(handleResponse);
};

const createUserType = (userTypeObject) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(userTypeObject),
  };

  return fetch("api/v1/user-type/", requestOptions).then(handleResponse);
};

const updateUserType = (userTypeObject) => {
  const requestOptions = {
    method: "PATCH",
    headers: authHeader(),
    body: JSON.stringify(userTypeObject),
  };

  return fetch(`api/v1/user-type/${userTypeObject.id}/`, requestOptions).then(
    handleResponse
  );
};

const deleteUserType = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`api/v1/user-type/${id}/`, requestOptions).then(handleResponse);
};

const getAllUsers = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    "https://spiralmath-17663.botics.co/api/v1/user/",
    requestOptions
  ).then(handleResponse);
};

const updateUser = (user) => {
  if (user["role"] !== "SystemAdministrator") {
    user["role"] = "Editor";
  } else {
    user["role"] = "Admin";
  }
  const requestOptions = {
    method: "PATCH",
    headers: authHeader(),
    body: JSON.stringify(user),
  };

  return fetch(`api/v1/user/${user.id}/`, requestOptions).then(handleResponse);
};

// prefixed function name with underscore because delete is a reserved word in javascript
const deleteUser = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`api/v1/user/${id}/`, requestOptions).then(handleResponse);
};

const getOneUser = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`api/v1/user/${id}/`, requestOptions).then(handleResponse);
};

const settings = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `https://spiralmath-17663.botics.co/api/v1/settings/terms/`,
    requestOptions
  ).then(handleResponse);
};

const sendInvitation = (id) => {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ id }),
  };

  return fetch(`api/v1/user/send-invitation/`, requestOptions).then();
};

function handleResponse(response, isLogout = true) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // auto logout if 401 response returned from api
        isLogout && logout();
      }
      return Promise.reject(data);
    }

    return Promise.resolve(data);
  });
}

export const userService = {
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
