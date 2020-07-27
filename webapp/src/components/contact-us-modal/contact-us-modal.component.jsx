import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Button, Modal } from "react-bootstrap";

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
  const { email, message } = inputs;
  const contacting = useSelector((state) => state.contactUs.contacting);
  const dispatch = useDispatch();

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
    if (email && message) {
      dispatch(userActions.contactUs(email, message));
    }
    setInputs({ email: "", message: "" });
  };

  return (
    <Modal show={show} onHide={toggleShow} className="contactus-popup">
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail" className="relative">
              <Form.Control type="email" className="input-style input-text" />
              <span class="floating-label">Email</span>
            </Form.Group>

            <Form.Group controlId="formMessage" className="relative">
              <Form.Control
                type="textarea"
                className="input-style input-text"
              />
              <span class="floating-label">Message</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={toggleShow}
            className="text-center custom-btn"
          >
            Submit
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
