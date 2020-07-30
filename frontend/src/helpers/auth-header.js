import Cookies from "js-cookie";

export function authHeader() {
  // return authorization header with jwt token
  const csrftoken = Cookies.get("csrftoken");
  console.log(csrftoken);

  if (true) {
    return {
      Authorization:
        "Bearer " +
        "dX1yAV0G0vEfONm8af4F7sOK6avGMm8dRrQkuoGdgrhEysEtB18WB40B8UN7Wck2",
    };
  } else {
    return {};
  }
}
