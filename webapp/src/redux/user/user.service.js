import { authHeader } from "../../helpers/auth-header";

const login = (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/auth/login/`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
};

const logout = () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  return fetch(`${process.env.REACT_APP_API_URL}/auth/logout/`, requestOptions)
    .then(handleResponse)
    .catch((error) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      return error;
    });
};

const getAllUsers = () => {
  // const requestOptions = {
  //   method: "GET",
  //   // headers: authHeader(),
  // };

  return fetch(`${process.env.REACT_APP_API_URL}/user/`).then(handleResponse);
};

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/users/${id}`,
    requestOptions
  ).then(handleResponse);
}

const register = (user) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/user/`, requestOptions).then(
    handleResponse
  );
};
const confirmUser = (user) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/user/`, requestOptions).then(
    handleResponse
  );
};

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/users/${user.id}`,
    requestOptions
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/users/${id}`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export const userService = {
  login,
  logout,
  register,
  getAllUsers,
  confirmUser,
};
