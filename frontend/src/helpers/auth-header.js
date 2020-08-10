import Cookies from "js-cookie";

export function authHeader() {
  const csrftoken = Cookies.get("csrftoken");

  const userLang = navigator.language || navigator.userLanguage;

  if (csrftoken) {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFTOKEN": csrftoken,
      "Accept-Language": userLang,
    };
  } else {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": userLang,
    };
  }
}
