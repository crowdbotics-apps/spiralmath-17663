export default function validateSignup(values) {
  let errors = {};
  if (!values.password) {
    errors.password = "password is required";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Password Confirm is required";
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Password should be same";
  }

  return errors;
}
