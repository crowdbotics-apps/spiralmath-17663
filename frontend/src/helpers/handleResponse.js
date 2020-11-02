import userService from "../redux/user/user.services";

export default function handleResponse(response, isLogout = true) {
   return response.text().then((text) => {
      const data = text && JSON.parse(text);
      console.log("Replace error response", response);
      if (!response.ok) {
         if (response.status === 401 || response.status === 403) {
            // auto logout if 401 response returned from api
            // isLogout && userService.logout();
         }
         console.log("replace error", data);
         return Promise.reject(data);
      }

      return Promise.resolve(data);
   });
}
