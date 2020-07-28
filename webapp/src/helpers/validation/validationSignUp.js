import getPasswordStrength from "./passwordChecker";

export default function validateSignup(values) {
  let errors = {};
  if (!values.password) {
    errors.password = "password is required";
  } else if (getPasswordStrength(values.password) === "too short") {
    errors.password = "Password is too short , at least 8 character long";
  } else if (
    getPasswordStrength(values.password) === "low" ||
    getPasswordStrength(values.password) === "medium"
  ) {
    errors.password =
      "Password should contain a capital ,a small and a special character";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Password Confirm is required";
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Password should be same";
  }

  return errors;
}
