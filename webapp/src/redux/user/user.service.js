import { authHeader } from "../../helpers/auth-header";
import Cookies from "js-cookie";


const login = (email, password) => {
  let headers = {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
};

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  };

  return fetch(`${process.env.REACT_APP_API_URL}/auth/login/`, requestOptions)
    .then((res) => {
      console.log("res", res);

      console.log("cc",  Cookies.get("csrftoken"));
      localStorage.setItem("myCookie", Cookies.get("csrftoken"));
      // handleResponse(res);
    })
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
  return fetch(
    `${process.env.REACT_APP_API_URL}/auth/logout/`,
    requestOptions
  ).then(handleResponse);
};

const getAllUsers = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/user/`, requestOptions).then(
    handleResponse
  );
};

const createUserType = ({ userType, createQuestions, reviewQuestions }) => {
  const userTypeToSend = {
    name: userType,
    create_questions: createQuestions,
    review_questions: reviewQuestions,
  };
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(userTypeToSend),
  };

  return fetch(
    `${process.env.REACT_APP_API_URL}/user-type/`,
    requestOptions
  ).then(handleResponse);
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
  if (user['role'] !== 'SystemAdministrator') {
    user['role'] = 'Editor'
  } else {
    user['role'] = 'Admin'
  }
  const pass = Math.random().toString(36).substring(7);
  const data = {
    email: user['email'],
    first_name: user['firstName'],
    last_name: user['lastName'],
    role: user['role'],
    password: pass
  };
  const requestOptions = {
    method: "POST",
    headers: {
      'Accept':  'application/json',
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': Cookies.get("csrftoken"),
    },
    credentials: 'include',
    body: JSON.stringify(data),
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

const resetPassword = (email) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };

  return fetch(`${process.env.REACT_APP_API_URL}/user/`, requestOptions).then(
    handleResponse
  );
};

export const contactUs = (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
  resetPassword,
  contactUs,
  createUserType,
};
