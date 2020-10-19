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
   console.log("vali", values);
   if (!(values.standard_set && values.standard_set.standard_set)) {
      errors.standard_set = requiredFieldError;
   }
   if (!values.reviewer_name) {
      errors.reviewer_name = requiredFieldError;
   }

   // if (!values.creator) {
   //    errors.creator = requiredFieldError;
   // }
   if (!values.value) {
      errors.value = requiredFieldError;
   }
   return errors;
};
