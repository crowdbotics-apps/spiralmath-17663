import getPasswordStrength from "./passwordChecker";
import { intl } from "../intl";

export default function validateSignup(values) {
  let errors = {};
  if (!values.password) {
    errors.password = intl.formatMessage({
      id: "pageSignupPasswordRequiredValidation",
      defaultMessage: "Password is required",
    });
  } else if (getPasswordStrength(values.password) === "too short") {
    errors.password = intl.formatMessage({
      id: "pageSignupPasswordTooShortValidation",
      defaultMessage: "Password is too short , at least 8 character long",
    });
  } else if (
    getPasswordStrength(values.password) === "low" ||
    getPasswordStrength(values.password) === "medium"
  ) {
    errors.password = intl.formatMessage({
      id: "pageSignupPasswordVariationValidation",
      defaultMessage:
        "Password should contain a capital ,a small and a special character",
    });
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = intl.formatMessage({
      id: "pageSignupPasswordConfirmRequiredValidation",
      defaultMessage: "Password Confirm is required",
    });
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = intl.formatMessage({
      id: "pageSignupPasswordSameValidation",
      defaultMessage: "Password should be same",
    });
  }

  if (!values.termsAndConditions) {
    errors.termsAndConditions = intl.formatMessage({
      id: "pageSignupTermsValidation",
      defaultMessage: "You should agreed to terms and conditions to proceed",
    });
  }

  return errors;
}
