import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { userActions, alertActions } from "../../redux/user/user.actions";
import validate from "../../helpers/validation/validationResetPassword";
import { selectShow } from "../../redux/modals/modal.select";
import { toggleShow } from "../../redux/modals/modals.actions";
import LogoAboveBox from "../../components/logo-above-box/logo-above-box.component";
import ContactUs from "../../components/contact-us-modal/contact-us-modal.component";

const ForgotPassword = ({ show, toggleShow }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const reseting = useSelector((state) => state.reset.reseting);
  const success = useSelector((state) => {
    return state.reset.success !== undefined ? true : false;
  });

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

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      submit();
    }
  }, [errors]);

  const handleContactUs = () => {
    toggleShow();
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors({ email: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(email));
    setSubmitted(true);
  };

  const submit = () => {
    if (email) {
      dispatch(userActions.resetPassword(email));
    }
    setEmail("");
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
            <div className="w-75 error-msg" onMouseEnter={handleClearMessage}>
              <p className="text-center text-success">{alert.message}</p>
            </div>
          )}
          {success ? (
            <div className="form-container w-50">
              <h1 className="text-center form-heading mb-3">
                <FormattedMessage
                  defaultMessage="Reset Your Password"
                  id="pageForgotHeader"
                />
              </h1>

              <p className="text-center instruction-text">
                <FormattedMessage
                  defaultMessage="Please enter your email and we will send you an"
                  id="pageForgotInstructions1"
                />
                <br />
                <FormattedMessage
                  defaultMessage="instruction email."
                  id="pageForgotInstructions2"
                />
              </p>
            </div>
          ) : (
            <div className="form-container w-50">
              <h1 className="text-center form-heading mb-3">
                <FormattedMessage
                  defaultMessage="Reset Your Password"
                  id="pageForgotHeader"
                />
              </h1>

              <p className="text-center instruction-text">
                <FormattedMessage
                  defaultMessage="Please enter your email and we will send you an"
                  id="pageForgotInstructions1"
                />
                <br />
                <FormattedMessage
                  defaultMessage="instruction email."
                  id="pageForgotInstructions2"
                />
              </p>

              <Form className="text-center" onSubmit={handleSubmit} noValidate>
                <Form.Group controlId="formEmail" className="relative">
                  <Form.Control
                    type="email"
                    className={`input-style input-text ${
                      email.length && "label-up"
                    }`}
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <span className="floating-label">
                    <FormattedMessage
                      defaultMessage="Email"
                      id="pageForgotEmailLabel"
                    />
                  </span>
                  {submitted && errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="custom-btn reset-pwd"
                >
                  {reseting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  <FormattedMessage
                    deafaultMessage="Send Password Reset"
                    id="pageForgotResetButton"
                  />
                </Button>
              </Form>

              <p className="mt-2 text-center login-text">
                <FormattedMessage
                  defaultMessage="Already have an account? "
                  id="pageForgotAlreadyHaveAnAccount"
                />
                <Link to="">
                  <span className="text-orange pointerType">
                    <FormattedMessage
                      defaultMessage="Login"
                      id="pageForgotLoginLink"
                    />
                  </span>
                </Link>
              </p>
            </div>
          )}

          <div className="have-issue-text">
            <p className="mt-2">
              <FormattedMessage
                defaultMessage="Have issues? "
                id="pageForgotHaveIssue"
              />
              <span
                className="text-orange pointerType"
                onClick={handleContactUs}
              >
                <FormattedMessage
                  defaultMessage="Contact Us"
                  id="pageForgotContactUs"
                />
              </span>
            </p>
          </div>
        </Col>
      </Row>

      {show ? <ContactUs /> : ""}
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  show: selectShow,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShow: () => dispatch(toggleShow()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
