import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Button, Modal } from "react-bootstrap";

import { selectShow } from "../../redux/modals/modal.select";
import { toggleShow } from "../../redux/modals/modals.actions";

const ContactUs = ({ show, toggleShow }) => {
  return (
    <Modal show={show} onHide={toggleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Control type="email" placeholder="email" />
          </Form.Group>

          <Form.Group controlId="formMessage">
            <Form.Control type="textarea" placeholder="message" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={toggleShow}>
          Submit
        </Button>
      </Modal.Footer>
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
