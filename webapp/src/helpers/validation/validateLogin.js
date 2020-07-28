import getPasswordStrength from "./passwordChecker";

export default function validateLogin(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (getPasswordStrength(values.password) === "too short") {
    errors.password = "Password is too short , at least 8 character long";
  } else if (getPasswordStrength(values.password) === "low") {
    errors.password =
      "Password should contain a capital ,a small and a special character";
  }

  return errors;
}
