import { intl } from "../intl";

export const validateCreateUser = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = intl.formatMessage({
      id: "componentUsersTabEmailRequiredValidation",
      defaultMessage: "Email is required",
    });
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = intl.formatMessage({
      id: "componentUsersTabEmailInvalidValidation",
      defaultMessage: "Email is invalid",
    });
  }
  if (!values.firstName) {
    errors.firstName = intl.formatMessage({
      id: "componentUsersTabFirstNameRequiredValidation",
      defaultMessage: "First name is required",
    });
  }
  if (!values.lastName) {
    errors.lastName = intl.formatMessage({
      id: "componentUsersTabLastNameRequiredValidation",
      defaultMessage: "Last name is required",
    });
  }
  if (!values.role) {
    errors.role = intl.formatMessage({
      id: "componentUsersTabRoleRequiredValidation",
      defaultMessage: "Role is required",
    });
  }

  return errors;
};

export const validateCreateUserTypes = (values) => {
  let errors = {};
  if (!values.userType) {
    errors.userType = intl.formatMessage({
      id: "componentUserTypesUserTypeRequiredValidation",
      defaultMessage: "User Type is required",
    });
  }
  return errors;
};
