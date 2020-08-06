import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import { validateReset } from "../../helpers/validation/validationSignUp";
import { history } from "../../helpers/history";
import { alertActions } from "../../redux/user/user.actions";
import { userActions } from "../../redux/user/user.actions";

import LogoAboveBox from "../../components/logo-above-box/logo-above-box.component";

import "../signup/signup.styles.css";

const ConfirmEmail = ({ show, toggleShow }) => {
  const alert = useSelector((state) => state.alert);

  const pageUrlParams = new URLSearchParams(window.location.search);
  const token = pageUrlParams.get("token");

  const [user, setUser] = useState({
    password: "",
    passwordConfirm: "",
    token,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const resetingPassword = useSelector(
    (state) => state.resetUserPassword.resetingPassword
  );
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });

    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).userObj.role === "Admin"
    ) {
      history.push("/admin-dashboard");
    } else if (localStorage.getItem("user")) {
      history.push("/users-dashboard");
    }
  }, [localStorage.getItem("user")]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validateReset(user));
    console.log(errors);
    setSubmitted(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      submit();
    }
  }, [errors]);

  const submit = () => {
    if (user.password && user.passwordConfirm && user.token) {
      const data = {
        newPassword: user.password,
        confirmPassword: user.passwordConfirm,
        token: user.token,
        acceptedTerms: true,
        signUp: false,
      };
      dispatch(userActions.resetUserPassword(data));
    }
  };

  const [passwordType1, setPasswordType1] = useState("password");
  const handlePasswordVisibility1 = () => {
    if (passwordType1 === "password") setPasswordType1("text");
    else setPasswordType1("password");
  };
  const [passwordType2, setPasswordType2] = useState("password");
  const handlePasswordVisibility2 = () => {
    if (passwordType2 === "password") setPasswordType2("text");
    else setPasswordType2("password");
  };
  const handleClearMessage = () => {
    dispatch(alertActions.clear());
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="mt-3">
          <LogoAboveBox />
          {alert.type === "alert-danger" ? (
            <div className="w-75 error-msg" onMouseEnter={handleClearMessage}>
              <p className="text-center">{alert.message}</p>
            </div>
          ) : (
            ""
          )}

          <div className="form-container w-50">
            <h1 className="text-center mb-3 form-heading">
              <FormattedMessage
                defaultMessage="Create Your Account"
                id="pageSignupCreateYourAccount"
              />
            </h1>

            <Form className="text-center" onSubmit={handleSubmit} noValidate>
              <Form.Group controlId="formPassword" className="relative">
                <Form.Control
                  type={passwordType1}
                  className={`input-style input-text ${
                    user.password.length && "label-up"
                  }`}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                <span className="floating-label">
                  <FormattedMessage
                    defaultMessage="Create Password"
                    id="pageSignupPasswordLabel"
                  />
                </span>
                <span className="eye-icon" onClick={handlePasswordVisibility1}>
                  <svg
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.48182 3.17632L1.40909 1.13632L2.56364 0L18.6818 15.8637L17.5273 17L14.8636 14.3874L14.4818 14.0116C13.2545 14.4947 11.9091 14.7632 10.5 14.7632C5.95455 14.7632 2.07273 11.9805 0.5 8.05263C1.20909 6.28105 2.39091 4.74211 3.9 3.58789L3.48182 3.17632ZM15.0455 8.05263C15.0455 5.58316 13.0091 3.57895 10.5 3.57895C9.90911 3.57895 9.35457 3.69526 8.83638 3.90105L6.87275 1.96842C8.00002 1.56579 9.2182 1.34211 10.4909 1.34211C15.0364 1.34211 18.9182 4.12474 20.4909 8.05263C19.8273 9.71684 18.7455 11.1753 17.3727 12.3026L14.7182 9.69C14.9273 9.18 15.0455 8.63421 15.0455 8.05263ZM6.43636 6.08421L7.84545 7.47105C7.8 7.65894 7.77273 7.85578 7.77273 8.05263C7.77273 9.53789 8.99091 10.7368 10.5 10.7368C10.7 10.7368 10.9 10.71 11.0909 10.6653L12.5 12.0521C11.8909 12.3474 11.2182 12.5263 10.5 12.5263C7.99091 12.5263 5.95455 10.5221 5.95455 8.05263C5.95455 7.34578 6.13636 6.68368 6.43636 6.08421ZM13.2182 8.20474L10.3546 5.38631L10.5091 5.37737C12.0182 5.37737 13.2364 6.57631 13.2364 8.06158L13.2182 8.20474Z"
                      fill="#B9B9B9"
                    />
                  </svg>
                </span>
                {submitted && errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="relative">
                <Form.Control
                  type={passwordType2}
                  className={`input-style input-text ${
                    user.passwordConfirm.length && "label-up"
                  }`}
                  name="passwordConfirm"
                  value={user.passwordConfirm}
                  onChange={handleChange}
                />
                <span className="floating-label">
                  <FormattedMessage
                    defaultMessage="Confirm Password"
                    id="pageSignupPasswordConfirmLabel"
                  />
                </span>
                <span className="eye-icon" onClick={handlePasswordVisibility2}>
                  <svg
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.48182 3.17632L1.40909 1.13632L2.56364 0L18.6818 15.8637L17.5273 17L14.8636 14.3874L14.4818 14.0116C13.2545 14.4947 11.9091 14.7632 10.5 14.7632C5.95455 14.7632 2.07273 11.9805 0.5 8.05263C1.20909 6.28105 2.39091 4.74211 3.9 3.58789L3.48182 3.17632ZM15.0455 8.05263C15.0455 5.58316 13.0091 3.57895 10.5 3.57895C9.90911 3.57895 9.35457 3.69526 8.83638 3.90105L6.87275 1.96842C8.00002 1.56579 9.2182 1.34211 10.4909 1.34211C15.0364 1.34211 18.9182 4.12474 20.4909 8.05263C19.8273 9.71684 18.7455 11.1753 17.3727 12.3026L14.7182 9.69C14.9273 9.18 15.0455 8.63421 15.0455 8.05263ZM6.43636 6.08421L7.84545 7.47105C7.8 7.65894 7.77273 7.85578 7.77273 8.05263C7.77273 9.53789 8.99091 10.7368 10.5 10.7368C10.7 10.7368 10.9 10.71 11.0909 10.6653L12.5 12.0521C11.8909 12.3474 11.2182 12.5263 10.5 12.5263C7.99091 12.5263 5.95455 10.5221 5.95455 8.05263C5.95455 7.34578 6.13636 6.68368 6.43636 6.08421ZM13.2182 8.20474L10.3546 5.38631L10.5091 5.37737C12.0182 5.37737 13.2364 6.57631 13.2364 8.06158L13.2182 8.20474Z"
                      fill="#B9B9B9"
                    />
                  </svg>
                </span>
                {submitted && errors.passwordConfirm && (
                  <div className="text-danger">{errors.passwordConfirm}</div>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className="custom-btn">
                {resetingPassword && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                <FormattedMessage
                  defaultMessage="Reset Password"
                  id="pageResetLink"
                />
              </Button>
            </Form>

            <p className="mt-2 text-center login-text">
              <FormattedMessage
                defaultMessage="Already have an account? "
                id="pageSignupAlreadyHave"
              />
              <Link to="/login">
                <span className="text-orange pointerType">
                  <FormattedMessage
                    defaultMessage="Login"
                    id="pageSignupLoginLink"
                  />
                </span>
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ConfirmEmail;
