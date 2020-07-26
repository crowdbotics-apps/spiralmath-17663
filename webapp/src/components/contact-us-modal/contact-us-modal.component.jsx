import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Button, Modal } from "react-bootstrap";

import { selectShow } from "../../redux/modals/modal.select";
import { toggleShow } from "../../redux/modals/modals.actions";

const ContactUs = ({ show, toggleShow }) => {
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
              <Form.Control type="textarea" className="input-style input-text" />
              <span class="floating-label">Message</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggleShow} className="text-center custom-btn">
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
