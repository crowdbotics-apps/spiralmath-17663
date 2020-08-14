import Cookies from "js-cookie";

export default function authHeader() {
  const csrftoken = Cookies.get("csrftoken");
  console.log(document.cookie);
  console.log(csrftoken);

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
