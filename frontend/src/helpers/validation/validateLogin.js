import getPasswordStrength from "./passwordChecker";
import { intl } from "../intl";

export default function validateLogin(values) {
  let errors = {};
  if (!values.email) {
    errors.email = intl.formatMessage({
      id: "pageLoginEmailRequiredValidation",
      defaultMessage: "Email is required",
    });
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = intl.formatMessage({
      id: "pageLoginEmailInvalidValidation",
      defaultMessage: "Email is invalid",
    });
  }
  if (!values.password) {
    errors.password = intl.formatMessage({
      id: "pageLoginPasswordRequiredValidation",
      defaultMessage: "Password is required",
    });
  }
  return errors;
}
