import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../../helpers/history";
import { alertActions } from "../../redux/user/user.actions";
import { userActions } from "../../redux/user/user.actions";
import { selectShow } from "../../redux/modals/modal.select";
import { toggleShow } from "../../redux/modals/modals.actions";
import LogoAboveBox from "../../components/logo-above-box/logo-above-box.component";
import ContactUs from "../../components/contact-us-modal/contact-us-modal.component";
import "./signup.styles.css";

const SignUp = ({ show, toggleShow }) => {
  const alert = useSelector((state) => state.alert);
  const [user, setUser] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
    dispatch(userActions.logout());
  }, []);

  // reset login status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (user.password && user.passwordConfirm) {
      dispatch(userActions.register(user));
    }
  };

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
      <Modal scrollable={true} show={displayTerms} onHide={closeDisplayTerms}>
        <Modal.Header closeButton>
          <Modal.Title>Termas and conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Terms and Conditions for Company Name Introduction These Website
          Standard Terms and Conditions written on this webpage shall manage
          your use of our website, Webiste Name accessible at Website.com. These
          Terms will be applied fully and affect to your use of this Website. By
          using this Website, you agreed to accept all terms and conditions
          written in here. You must not use this Website if you disagree with
          any of these Website Standard Terms and Conditions. Minors or people
          below 18 years old are not allowed to use this Website. Intellectual
          Property Rights Other than the content you own, under these Terms,
          Company Name and/or its licensors own all the intellectual property
          rights and materials contained in this Website. You are granted
          limited license only for purposes of viewing the material contained on
          this Website. Restrictions You are specifically restricted from all of
          the following: publishing any Website material in any other media;
          selling, sublicensing and/or otherwise commercializing any Website
          material; publicly performing and/or showing any Website material;
          using this Website in any way that is or may be damaging to this
          Website; using this Website in any way that impacts user access to
          this Website; using this Website contrary to applicable laws and
          regulations, or in any way may cause harm to the Website, or to any
          person or business entity; engaging in any data mining, data
          harvesting, data extracting or any other similar activity in relation
          to this Website; using this Website to engage in any advertising or
          marketing. Certain areas of this Website are restricted from being
          access by you and Company Name may further restrict access by you to
          any areas of this Website, at any time, in absolute discretion. Any
          user ID and password you may have for this Website are confidential
          and you must maintain confidentiality as well. Your Content In these
          Website Standard Terms and Conditions, “Your Content” shall mean any
          audio, video text, images or other material you choose to display on
          this Website. By displaying Your Content, you grant Company Name a
          non-exclusive, worldwide irrevocable, sub licensable license to use,
          reproduce, adapt, publish, translate and distribute it in any and all
          media. Your Content must be your own and must not be invading any
          third-party's rights. Company Name reserves the right to remove any of
          Your Content from this Website at any time without notice. No
          warranties This Website is provided “as is,” with all faults, and
          Company Name express no representations or warranties, of any kind
          related to this Website or the materials contained on this Website.
          Also, nothing contained on this Website shall be interpreted as
          advising you. Limitation of liability In no event shall Company Name,
          nor any of its officers, directors and employees, shall be held liable
          for anything arising out of or in any way connected with your use of
          this Website whether such liability is under contract. Company Name,
          including its officers, directors and employees shall not be held
          liable for any indirect, consequential or special liability arising
          out of or in any way related to your use of this Website.
          Indemnification You hereby indemnify to the fullest extent Company
          Name from and against any and/or all liabilities, costs, demands,
          causes of action, damages and expenses arising in any way related to
          your breach of any of the provisions of these Terms. Severability If
          any provision of these Terms is found to be invalid under any
          applicable law, such provisions shall be deleted without affecting the
          remaining provisions herein. Variation of Terms Company Name is
          permitted to revise these Terms at any time as it sees fit, and by
          using this Website you are expected to review these Terms on a regular
          basis. Assignment The Company Name is allowed to assign, transfer, and
          subcontract its rights and/or obligations under these Terms without
          any notification. However, you are not allowed to assign, transfer, or
          subcontract any of your rights and/or obligations under these Terms.
          Entire Agreement These Terms constitute the entire agreement between
          Company Name and you in relation to your use of this Website, and
          supersede all prior agreements and understandings. Governing Law &
          Jurisdiction These Terms will be governed by and interpreted in
          accordance with the laws of the State of Country, and you submit to
          the non-exclusive jurisdiction of the state and federal courts located
          in Country for the resolution of any disputes.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDisplayTerms}>
            Close
          </Button>
          <Button variant="primary" onClick={closeDisplayTerms}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="mt-3">
          <LogoAboveBox />
          <div class="w-75 error-msg">
            <p className="text-center">The Password does not match!</p>
          </div>

          <div class="form-container w-50">
            <h1 className="text-center mb-3 form-heading">
              Create Your Account
            </h1>

            <Form className="text-center">
              <Form.Group controlId="formPassword" className="relative">
                <Form.Control
                  type="password"
                  className="input-style input-text"
                />
                <span class="floating-label">Create Password</span>
                <span className="eye-icon">
                  <svg
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.48182 3.17632L1.40909 1.13632L2.56364 0L18.6818 15.8637L17.5273 17L14.8636 14.3874L14.4818 14.0116C13.2545 14.4947 11.9091 14.7632 10.5 14.7632C5.95455 14.7632 2.07273 11.9805 0.5 8.05263C1.20909 6.28105 2.39091 4.74211 3.9 3.58789L3.48182 3.17632ZM15.0455 8.05263C15.0455 5.58316 13.0091 3.57895 10.5 3.57895C9.90911 3.57895 9.35457 3.69526 8.83638 3.90105L6.87275 1.96842C8.00002 1.56579 9.2182 1.34211 10.4909 1.34211C15.0364 1.34211 18.9182 4.12474 20.4909 8.05263C19.8273 9.71684 18.7455 11.1753 17.3727 12.3026L14.7182 9.69C14.9273 9.18 15.0455 8.63421 15.0455 8.05263ZM6.43636 6.08421L7.84545 7.47105C7.8 7.65894 7.77273 7.85578 7.77273 8.05263C7.77273 9.53789 8.99091 10.7368 10.5 10.7368C10.7 10.7368 10.9 10.71 11.0909 10.6653L12.5 12.0521C11.8909 12.3474 11.2182 12.5263 10.5 12.5263C7.99091 12.5263 5.95455 10.5221 5.95455 8.05263C5.95455 7.34578 6.13636 6.68368 6.43636 6.08421ZM13.2182 8.20474L10.3546 5.38631L10.5091 5.37737C12.0182 5.37737 13.2364 6.57631 13.2364 8.06158L13.2182 8.20474Z"
                      fill="#B9B9B9"
                    />
                  </svg>
                </span>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="relative">
                <Form.Control
                  type="password"
                  className="input-style input-text"
                />
                <span class="floating-label">Confirm Password</span>
                <span className="eye-icon">
                  <svg
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.48182 3.17632L1.40909 1.13632L2.56364 0L18.6818 15.8637L17.5273 17L14.8636 14.3874L14.4818 14.0116C13.2545 14.4947 11.9091 14.7632 10.5 14.7632C5.95455 14.7632 2.07273 11.9805 0.5 8.05263C1.20909 6.28105 2.39091 4.74211 3.9 3.58789L3.48182 3.17632ZM15.0455 8.05263C15.0455 5.58316 13.0091 3.57895 10.5 3.57895C9.90911 3.57895 9.35457 3.69526 8.83638 3.90105L6.87275 1.96842C8.00002 1.56579 9.2182 1.34211 10.4909 1.34211C15.0364 1.34211 18.9182 4.12474 20.4909 8.05263C19.8273 9.71684 18.7455 11.1753 17.3727 12.3026L14.7182 9.69C14.9273 9.18 15.0455 8.63421 15.0455 8.05263ZM6.43636 6.08421L7.84545 7.47105C7.8 7.65894 7.77273 7.85578 7.77273 8.05263C7.77273 9.53789 8.99091 10.7368 10.5 10.7368C10.7 10.7368 10.9 10.71 11.0909 10.6653L12.5 12.0521C11.8909 12.3474 11.2182 12.5263 10.5 12.5263C7.99091 12.5263 5.95455 10.5221 5.95455 8.05263C5.95455 7.34578 6.13636 6.68368 6.43636 6.08421ZM13.2182 8.20474L10.3546 5.38631L10.5091 5.37737C12.0182 5.37737 13.2364 6.57631 13.2364 8.06158L13.2182 8.20474Z"
                      fill="#B9B9B9"
                    />
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
              <Button variant="primary" className="custom-btn">
                Sign up
              </Button>
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
