import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import { userActions } from "../../redux/user/user.actions";
import validate from "../../helpers/validation/validationResetPassword";
import { selectShow } from "../../redux/modals/modal.select";
import { toggleShow } from "../../redux/modals/modals.actions";
import LogoAboveBox from "../../components/logo-above-box/logo-above-box.component";
import ContactUs from "../../components/contact-us-modal/contact-us-modal.component";

const ForgotPassword = ({ show, toggleShow }) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const reseting = useSelector((state) => state.reset.reseting);

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

  return (
    <React.Fragment>
      <Row>
        <Col className="mt-3">
          <LogoAboveBox />
          <div class="form-container w-50">
            <h1 className="text-center form-heading mb-3">
              Reset Your Password
            </h1>

            <p className="text-center instruction-text">
              Please enter your email and we will send you an instruction email.
            </p>

            <Form className="text-center" onSubmit={handleSubmit} noValidate>
              <Form.Group controlId="formEmail" className="relative">
                <Form.Control
                  type="email"
                  className="input-style input-text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <span className="floating-label">Email</span>
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
                Send Password Reset
              </Button>
            </Form>
          </div>
          <div className="have-issue-text">
            <p className="mt-2">
              Have issues ?
              <span
                className="text-orange pointerType"
                onClick={handleContactUs}
              >
                Contact us
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
