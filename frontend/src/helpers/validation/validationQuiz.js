import { intl } from "../intl";

export const validateCreateQuiz = (values) => {
  let errors = {};
  const requiredFieldError = intl.formatMessage({
    id: "requiredFieldError",
    defaultMessage: "This field is required",
  });
  if (!values.grade) {
    errors.grade = requiredFieldError;
  }
  if (!values.title) {
    errors.title = requiredFieldError;
  }
  console.log(values);
  if (!values.description) {
    errors.description = requiredFieldError;
  }

  if (!values.footer) {
    errors.footer = requiredFieldError;
  }
  if (!values.sequence) {
    errors.sequence = requiredFieldError;
  }
  return errors;
};
