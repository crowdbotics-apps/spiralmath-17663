import { intl } from "../intl";

export const validateCreateQuestion = (values) => {
   let errors = {};
   const requiredFieldError = intl.formatMessage({
      id: "requiredFieldError",
      defaultMessage: "This field is required",
   });
   if (!values.mills_difficulty_level) {
      errors.mills_difficulty_level = requiredFieldError;
   }
   if (!values.dok) {
      errors.dok = requiredFieldError;
   }
   if (!values.standard_set) {
      errors.standard_set = requiredFieldError;
   }
   if (!values.value) {
      errors.value = requiredFieldError;
   }
   return errors;
};
