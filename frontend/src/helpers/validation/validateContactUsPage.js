export default function validateLogin(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.message) {
    errors.message = "This field is required";
  }

  return errors;
}
