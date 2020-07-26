import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectShow } from "../../redux/modals/modal.select";
import { toggleShow } from "../../redux/modals/modals.actions";
import LogoAboveBox from "../../components/logo-above-box/logo-above-box.component";
import ContactUs from "../../components/contact-us-modal/contact-us-modal.component";
import "./signup.styles.css";

const SignUp = ({ show, toggleShow }) => {
  const [displayTerms, setDisplayTerms] = useState(false);

  const handleTermsOfUse = () => {
    setDisplayTerms(true);
  };

  const handleContactUs = () => {
    toggleShow();
  };

  const closeDisplayTerms = () => setDisplayTerms(false);

  const termsAndConditions = () => {
    return (
      <Modal scrollable={true} show={displayTerms} onHide={closeDisplayTerms} className="term-use">
        <Modal.Header closeButton>
          <Modal.Title>
            Termas and conditions
        </Modal.Title>


        </Modal.Header>
        <Modal.Body>
          <div class="second-heading-para">
            <p>
              Welcome to SpiralMath question database. Thank you for agreeing to help with the creating, entering, and reviewing questions and answers.
            </p>
            <p>
              Please consider carefully the terms listed below:
            </p>
          </div>
          
          <div className="body-content">
            <ul>
              <li>
                • The questions and answers (Q&amp;A) you enter into the database must be from a known source. 
              </li>
              
              <li>
                • You must know who created them, and you will be asked to enter the creator’s name along with the question content.
              </li>
              
              <li>
                • You acknowledge that the Q&amp;A was not copied from a copyrighted textbook, workbook, worksheet or other source. Also the Q&amp;A was not given to you by another person in a manner that leaves you uncertain about its source or Copyright status.                
              </li>

              <li>
                • You acknowledge that the creator of the Q&amp;A has given you permission to enter the content into the SpiralMath database under these terms.
              </li>

              <li>
                • The creator of the Q&amp;A will retain ownership of the Copyright.
              </li>

              <li>
                • The creator hereby assigns to SpiralMath a license to use the Q&A, without time limit, in this database and any other SpiralMath products and services.  
              </li>
            </ul>
          </div>

          <div className="bottom-text">
            <p>
              If you have questions about any of these terms, please send us an email at the contact address below.
            </p>

            <p>
              If you agree to these terms please click on “Agree and continue.”
            </p>

            <p>
              If you do not agree with these terms, please click on “Quit.”
            </p>

            <p>
              Thank you for participating.
            </p>
          </div>

          <div className="bottom-text-2">
            <p>
              Contact david.robson@spiralmath.net
            </p>
            <p>
              SpiralMath.net is a service of Formative Assessment and Analytics, LLC
            </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="mt-3">
          <LogoAboveBox />
          <div class="w-75 error-msg">
            <p className="text-center">
              The Password does not match!
            </p>  
          </div>

          <div class="form-container w-50">
            <h1 className="text-center mb-3 form-heading">
              Create Your Account
            </h1>

            <Form className="text-center">
              <Form.Group controlId="formPassword" className="relative">
                <Form.Control type="password" className="input-style input-text" />
                <span class="floating-label">Create Password</span>
                <span className="eye-icon">
                  <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.48182 3.17632L1.40909 1.13632L2.56364 0L18.6818 15.8637L17.5273 17L14.8636 14.3874L14.4818 14.0116C13.2545 14.4947 11.9091 14.7632 10.5 14.7632C5.95455 14.7632 2.07273 11.9805 0.5 8.05263C1.20909 6.28105 2.39091 4.74211 3.9 3.58789L3.48182 3.17632ZM15.0455 8.05263C15.0455 5.58316 13.0091 3.57895 10.5 3.57895C9.90911 3.57895 9.35457 3.69526 8.83638 3.90105L6.87275 1.96842C8.00002 1.56579 9.2182 1.34211 10.4909 1.34211C15.0364 1.34211 18.9182 4.12474 20.4909 8.05263C19.8273 9.71684 18.7455 11.1753 17.3727 12.3026L14.7182 9.69C14.9273 9.18 15.0455 8.63421 15.0455 8.05263ZM6.43636 6.08421L7.84545 7.47105C7.8 7.65894 7.77273 7.85578 7.77273 8.05263C7.77273 9.53789 8.99091 10.7368 10.5 10.7368C10.7 10.7368 10.9 10.71 11.0909 10.6653L12.5 12.0521C11.8909 12.3474 11.2182 12.5263 10.5 12.5263C7.99091 12.5263 5.95455 10.5221 5.95455 8.05263C5.95455 7.34578 6.13636 6.68368 6.43636 6.08421ZM13.2182 8.20474L10.3546 5.38631L10.5091 5.37737C12.0182 5.37737 13.2364 6.57631 13.2364 8.06158L13.2182 8.20474Z" fill="#B9B9B9"/>
                  </svg>
                </span>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="relative">
                <Form.Control type="password" className="input-style input-text" />
                <span class="floating-label">Confirm Password</span>
                <span className="eye-icon">
                  <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.48182 3.17632L1.40909 1.13632L2.56364 0L18.6818 15.8637L17.5273 17L14.8636 14.3874L14.4818 14.0116C13.2545 14.4947 11.9091 14.7632 10.5 14.7632C5.95455 14.7632 2.07273 11.9805 0.5 8.05263C1.20909 6.28105 2.39091 4.74211 3.9 3.58789L3.48182 3.17632ZM15.0455 8.05263C15.0455 5.58316 13.0091 3.57895 10.5 3.57895C9.90911 3.57895 9.35457 3.69526 8.83638 3.90105L6.87275 1.96842C8.00002 1.56579 9.2182 1.34211 10.4909 1.34211C15.0364 1.34211 18.9182 4.12474 20.4909 8.05263C19.8273 9.71684 18.7455 11.1753 17.3727 12.3026L14.7182 9.69C14.9273 9.18 15.0455 8.63421 15.0455 8.05263ZM6.43636 6.08421L7.84545 7.47105C7.8 7.65894 7.77273 7.85578 7.77273 8.05263C7.77273 9.53789 8.99091 10.7368 10.5 10.7368C10.7 10.7368 10.9 10.71 11.0909 10.6653L12.5 12.0521C11.8909 12.3474 11.2182 12.5263 10.5 12.5263C7.99091 12.5263 5.95455 10.5221 5.95455 8.05263C5.95455 7.34578 6.13636 6.68368 6.43636 6.08421ZM13.2182 8.20474L10.3546 5.38631L10.5091 5.37737C12.0182 5.37737 13.2364 6.57631 13.2364 8.06158L13.2182 8.20474Z" fill="#B9B9B9"/>
                  </svg>
                </span>
              </Form.Group>

              <Form.Group className="ml-4" controlId="formBasicCheckbox">
                <div class="signup-checkbox">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>
                    I have read and accepts the &nbsp;
                  </Form.Check.Label>
                  <span class="checkmark"></span>
                  <span
                    className="text-orange tou pointerType"
                    onClick={handleTermsOfUse}
                  >
                    Terms of Use
                  </span>
                </div>
              </Form.Group>
              <Button variant="primary" className="custom-btn">Sign up</Button>
            </Form>

            <p className="mt-2 text-center login-text">
              Already have an account ?
              <Link to="/login">
                <span className="text-orange pointerType">Log in </span>
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
      {displayTerms ? termsAndConditions() : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
