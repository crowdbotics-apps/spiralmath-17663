import authHeader from "./authHeader";

export default {
  method: "GET",
  credentials: "include",
  headers: authHeader(),
};
