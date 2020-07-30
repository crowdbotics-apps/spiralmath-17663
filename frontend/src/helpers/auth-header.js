import Cookies from "js-cookie";

export function authHeader() {
  // return authorization header with jwt token
  const csrftoken = Cookies.get("csrftoken");

  if (csrftoken) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFTOKEN": csrftoken,
    };
  } else {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
}
