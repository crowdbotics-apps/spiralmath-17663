import handleResponse from "../../helpers/handleResponse";
import authHeader from "../../helpers/authHeader";
import { uploadHeader } from "../../helpers/utils";

const upload_file = (data) => {
   const requestOptions = {
      method: "POST",
      headers: uploadHeader(),
      body: data,
   };
   return fetch(
      "https://spiralmath-17663.botics.co/api/v1/settings/upload/",
      requestOptions
   ).then(handleResponse);
};

const upload_terms = (data) => {
   const request = {
      path: "terms-condition",
      value: data,
   };

   const requestOptions = {
      method: "PATCH",
      headers: authHeader(),
      body: JSON.stringify(request),
   };

   return fetch(
      "https://spiralmath-17663.botics.co/api/v1/settings/1/",
      requestOptions
   ).then(handleResponse);
};

const upload_non_registered = (data) => {
   const request = {
      path: "non-registered-email",
      value: data.non_registered,
   };

   const requestOptions = {
      method: "PATCH",
      headers: authHeader(),
      body: JSON.stringify(request),
   };
   return fetch(
      "https://spiralmath-17663.botics.co/api/v1/settings/2/",
      requestOptions
   ).then(handleResponse);
};
const upload_registered = (data) => {
   const request = {
      path: "registered-email",
      value: data.registered,
   };

   const requestOptions = {
      method: "PATCH",
      headers: authHeader(),
      body: JSON.stringify(request),
   };
   return fetch(
      "https://spiralmath-17663.botics.co/api/v1/settings/3/",
      requestOptions
   ).then(handleResponse);
};

const get_settings = () => {
   const requestOptions = {
      method: "GET",
      headers: authHeader(),
   };
   return fetch(
      "https://spiralmath-17663.botics.co/api/v1/settings/",
      requestOptions
   ).then(handleResponse);
};

export default {
   upload_file,
   upload_non_registered,
   upload_registered,
   upload_terms,
   get_settings,
};
