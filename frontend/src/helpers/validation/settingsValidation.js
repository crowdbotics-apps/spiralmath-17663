import { intl } from "../intl";

export const emailsValidation = (values) => {
  let errors = {};
  if (!values.non_registered) {
    errors.non_registered = intl.formatMessage({
      id: "pageLoginEmailRequiredValidation",
      defaultMessage: "Email is required",
    });
  } else if (!/\S+@\S+\.\S+/.test(values.non_registered)) {
    errors.non_registered = intl.formatMessage({
      id: "pageLoginEmailInvalidValidation",
      defaultMessage: "Email is invalid",
    });
  }
  if (!values.registered) {
    errors.registered = intl.formatMessage({
      id: "pageLoginEmailRequiredValidation",
      defaultMessage: "Email is required",
    });
  } else if (!/\S+@\S+\.\S+/.test(values.registered)) {
    errors.registered = intl.formatMessage({
      id: "pageLoginEmailInvalidValidation",
      defaultMessage: "Email is invalid",
    });
  }
  return errors;
};

export const termsValidation = (value) => {
  let error = "";
  if (!value) {
    error = "This field is required";
  }
  return error;
};
