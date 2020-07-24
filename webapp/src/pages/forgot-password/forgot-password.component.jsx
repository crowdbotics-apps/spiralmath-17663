import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectShow } from "../../redux/modals/modal.select";
import { toggleShow } from "../../redux/modals/modals.actions";

import LogoAboveBox from "../../components/logo-above-box/logo-above-box.component";
import ContactUs from "../../components/contact-us-modal/contact-us-modal.component";

const ForgotPassword = ({ show, toggleShow }) => {
  const handleContactUs = () => {
    toggleShow();
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="mt-3">
          <LogoAboveBox />
          <h1 className="text-center">Reset Your Password</h1>

          <p className="text-center">
            Please enter your email and we will send you an instruction email.
          </p>

          <Form>
            <Form.Group controlId="formEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send Password Reset
            </Button>
          </Form>
          <p className="mt-2">
            Have issues ?
            <span className="text-orange pointerType" onClick={handleContactUs}>
              Contact us
            </span>
          </p>
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
