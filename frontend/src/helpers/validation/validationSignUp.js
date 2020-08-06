import getPasswordStrength from "./passwordChecker";
import { intl } from "../intl";

export function validateSignup(values) {
  let errors = {};
  if (!values.password) {
    errors.password = intl.formatMessage({
      id: "pageSignupPasswordRequiredValidation",
      defaultMessage: "Password is required",
    });
  } else if (getPasswordStrength(values.password) === "too short") {
    errors.password = intl.formatMessage({
      id: "pageSignupPasswordTooShortValidation",
      defaultMessage:
        "Password is too short. Password should contain at least 8 characters long.",
    });
  } else if (
    getPasswordStrength(values.password) === "low" ||
    getPasswordStrength(values.password) === "medium"
  ) {
    errors.password = intl.formatMessage({
      id: "pageSignupPasswordVariationValidation",
      defaultMessage:
        "Password should contains at least one capital letter, 1 small letter and a special character.",
    });
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = intl.formatMessage({
      id: "pageSignupPasswordConfirmRequiredValidation",
      defaultMessage: "Confirm Password is required",
    });
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = intl.formatMessage({
      id: "pageSignupPasswordSameValidation",
      defaultMessage: "Passwords does not match.",
    });
  }

  if (!values.termsAndConditions) {
    errors.termsAndConditions = intl.formatMessage({
      id: "pageSignupTermsValidation",
      defaultMessage: "You should agree to the Terms of Use.",
    });
  }

  return errors;
}

export function validateReset(values) {
  let errors = {};
  if (!values.password) {
    errors.password = intl.formatMessage({
      id: "pageSignupPasswordRequiredValidation",
      defaultMessage: "Password is required",
    });
  } else if (getPasswordStrength(values.password) === "too short") {
    errors.password = intl.formatMessage({
      id: "pageSignupPasswordTooShortValidation",
      defaultMessage:
        "Password is too short. Password should contain at least 8 characters long.",
    });
  } else if (
    getPasswordStrength(values.password) === "low" ||
    getPasswordStrength(values.password) === "medium"
  ) {
    errors.password = intl.formatMessage({
      id: "pageSignupPasswordVariationValidation",
      defaultMessage:
        "Password should contains at least one capital letter, 1 small letter and a special character.",
    });
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = intl.formatMessage({
      id: "pageSignupPasswordConfirmRequiredValidation",
      defaultMessage: "Confirm Password is required",
    });
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = intl.formatMessage({
      id: "pageSignupPasswordSameValidation",
      defaultMessage: "Passwords does not match.",
    });
  }

  return errors;
}
