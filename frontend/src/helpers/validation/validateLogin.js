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
  } else if (getPasswordStrength(values.password) === "too short") {
    errors.password = intl.formatMessage({
      id: "pageLoginPasswordTooShortValidation",
      defaultMessage: "Password is too short , at least 8 character long",
    });
  } else if (getPasswordStrength(values.password) === "low") {
    errors.password = intl.formatMessage({
      id: "pageLoginPasswordVariationValidation",
      defaultMessage:
        "Password should contain a capital ,a small and a special character",
    });
  }

  return errors;
}
