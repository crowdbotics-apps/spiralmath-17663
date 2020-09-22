import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Button, Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import { alertActions } from "../../redux/user/user.actions";
import { userActions } from "../../redux/user/user.actions";
import validate from "../../helpers/validation/validateContactUsPage";
import { selectShow } from "../../redux/modals/modal.select";
import { toggleShow } from "../../redux/modals/modals.actions";

const ContactUs = ({ show, toggleShow }) => {
  const [inputs, setInputs] = useState({
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { message } = inputs;
  let { email } = inputs;
  const contacting = useSelector((state) => state.contactUs.contacting);
  const localUser =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      submit();
    }
  }, [errors]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    setErrors({ ...errors, [name]: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(inputs));
    setSubmitted(true);
  }

  const submit = () => {
    if (localUser) {
      email = localUser.userObj.email;
    }
    if (email && message) {
      dispatch(userActions.contactUs(email, message));
    }
    setInputs({ email: "", message: "" });
  };

  const handleAlertClear = () => {
    dispatch(alertActions.clear());
  };

  return (
    <Modal show={show} onHide={toggleShow} className="contactus-popup">
      <div>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage
              defaultMessage="Contact Us"
              id="componentContactHeader"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert.type === "alert-success" && show ? (
            <div className="w-75 error-msg" onMouseEnter={handleAlertClear}>
              <p className="text-center text-success">{alert.message}</p>
            </div>
          ) : (
            <div className="w-75 error-msg" onMouseEnter={handleAlertClear}>
              <p className="text-center ">{alert.message}</p>
            </div>
          )}
          <Form noValidate onSubmit={handleSubmit}>
            {!localUser ? (
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
                    id="componentContactEmailLabel"
                  />
                </span>
                {submitted && errors.email && (
                  <p className="text-danger form-text-danger">{errors.email}</p>
                )}
              </Form.Group>
            ) : (
              ""
            )}

            <Form.Group controlId="formMessage" className="relative">
              <Form.Control
                type="textarea"
                as="textarea"
                className={`cus input-style input-text ${
                  message.length && "label-up"
                }`}
                name="message"
                value={message}
                onChange={handleChange}
              />
              <span className="floating-label">
                <FormattedMessage
                  defaultMessage="Message"
                  id="componentContactMessageLabel"
                />
              </span>
              {submitted && errors.message && (
                <p className="text-danger form-text-danger">{errors.message}</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="text-center custom-btn"
          >
            {contacting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            <FormattedMessage
              defaultMessage="Submit"
              id="componentContactSubmitButton"
            />
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
