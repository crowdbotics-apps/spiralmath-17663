import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectShow } from "../../redux/modals/modal.select";
import { toggleShow } from "../../redux/modals/modals.actions";

import LogoAboveBox from "../../components/logo-above-box/logo-above-box.component";
import ContactUs from "../../components/contact-us-modal/contact-us-modal.component";

const Login = ({ show, toggleShow }) => {
  const handleContactUs = () => {
    toggleShow();
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="mt-3">
          <LogoAboveBox />
          <h1 className="text-center">Login form</h1>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Control type="password" placeholder="password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <p className="mt-2">
            Already have an account ?
            <Link to="/forgot-password">
              <span className="text-orange pointerType">Reset </span>
            </Link>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
