import { intl } from "../intl";

export default function validate(values) {
  let errors = {};
  if (!values) {
    errors.email = intl.formatMessage({
      id: "pageForgotEmailRequiredValidation",
      defaultMessage: "Email is required",
    });
  } else if (!/\S+@\S+\.\S+/.test(values)) {
    errors.email = intl.formatMessage({
      id: "pageForgotEmailInvalidValidation",
      defaultMessage: "Email is invalid",
    });
  }

  return errors;
}
