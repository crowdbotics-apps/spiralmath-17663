export default function validate(values) {
  let errors = {};
  if (!values) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values)) {
    errors.email = "Email address is invalid";
  }
  if (!values) {
    errors.password = "Password is required";
  }

  return errors;
}
