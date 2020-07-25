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
          <div class="form-container w-50">
            <h1 className="text-center form-heading mb-3">
              Reset Your Password
            </h1>

            <p className="text-center instruction-text">
              Please enter your email and we will send you an instruction email.
            </p>

            <p className="text-center instruction-text second-msg">
              We have sent you the instruction to your email to reset your password. If you do not receive an email, check your spam folder or make sure your email from SpiralMath are approved.              
            </p>

            <Form className="text-center">
              <Form.Group controlId="formEmail" className="relative">
                <Form.Control type="email" className="input-style input-text"  />
                <span class="floating-label">Email</span>
              </Form.Group>

              <Button variant="primary" type="submit"  className="custom-btn reset-pwd">
                Send Password Reset
              </Button>
            </Form>
          </div>
          <div className="have-issue-text">
            <p className="mt-2">
              Have issues ?
              <span className="text-orange pointerType" onClick={handleContactUs}>
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
