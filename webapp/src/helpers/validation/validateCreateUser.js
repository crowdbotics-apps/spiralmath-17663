export const validateCreateUser = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.firstName) {
    errors.firstName = "firstName is required";
  }
  if (!values.lastName) {
    errors.lastName = "lastName is required";
  }
  if (!values.role) {
    errors.role = "Role is required";
  }

  return errors;
};

export const validateCreateUserTypes = (values) => {
  let errors = {};
  if (!values.userType) {
    errors.userType = "User type is required";
  }
  return errors;
};
