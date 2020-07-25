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
          <div class="w-75 error-msg">
            <p className="text-center">
              Wrong email or password. please try again!
            </p>  
          </div>

          <div class="form-container w-50">
            <h1 className="text-center form-heading">
              Welcome Back
            </h1>

            <Form className="text-center">
              <Form.Group controlId="formEmail" className="relative">
                <Form.Control type="email" className="input-style input-text" />
                <span class="floating-label">Email</span>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="relative">
                <Form.Control type="password" className="input-style input-text" />
                <span class="floating-label">Password</span>
                <span className="eye-icon">
                  <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.48182 3.17632L1.40909 1.13632L2.56364 0L18.6818 15.8637L17.5273 17L14.8636 14.3874L14.4818 14.0116C13.2545 14.4947 11.9091 14.7632 10.5 14.7632C5.95455 14.7632 2.07273 11.9805 0.5 8.05263C1.20909 6.28105 2.39091 4.74211 3.9 3.58789L3.48182 3.17632ZM15.0455 8.05263C15.0455 5.58316 13.0091 3.57895 10.5 3.57895C9.90911 3.57895 9.35457 3.69526 8.83638 3.90105L6.87275 1.96842C8.00002 1.56579 9.2182 1.34211 10.4909 1.34211C15.0364 1.34211 18.9182 4.12474 20.4909 8.05263C19.8273 9.71684 18.7455 11.1753 17.3727 12.3026L14.7182 9.69C14.9273 9.18 15.0455 8.63421 15.0455 8.05263ZM6.43636 6.08421L7.84545 7.47105C7.8 7.65894 7.77273 7.85578 7.77273 8.05263C7.77273 9.53789 8.99091 10.7368 10.5 10.7368C10.7 10.7368 10.9 10.71 11.0909 10.6653L12.5 12.0521C11.8909 12.3474 11.2182 12.5263 10.5 12.5263C7.99091 12.5263 5.95455 10.5221 5.95455 8.05263C5.95455 7.34578 6.13636 6.68368 6.43636 6.08421ZM13.2182 8.20474L10.3546 5.38631L10.5091 5.37737C12.0182 5.37737 13.2364 6.57631 13.2364 8.06158L13.2182 8.20474Z" fill="#B9B9B9"/>
                  </svg>
                </span>
              </Form.Group>

              <Button variant="primary" type="submit" className="text-center custom-btn">
                Login
              </Button>
            </Form>
            <p className="mt-2 text-center login-text">
              Already have an account ?
              <Link to="/forgot-password">
                <span className="text-orange pointerType">Reset </span>
              </Link>
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
