import { intl } from "../intl";

const localUser =
   localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;

export default function validateLogin(values) {
   let errors = {};

   if (!localUser) {
      if (!values.email) {
         errors.email = intl.formatMessage({
            id: "componentContactEmailRequiredValidation",
            defaultMessage: "Email is required",
         });
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
         errors.email = intl.formatMessage({
            id: "componentContactEmailInvalidValidation",
            defaultMessage: "Email is invalid",
         });
      }
   }

   if (!values.message) {
      errors.message = intl.formatMessage({
         id: "componentContactMessageRequiredValidation",
         defaultMessage: "This field is required",
      });
   }

   return errors;
}
