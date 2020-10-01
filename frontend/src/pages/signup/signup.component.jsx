import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import parse from "html-react-parser";

import { validateSignup } from "../../helpers/validation/validationSignUp";
import { history } from "../../helpers/history";
import { alertActions } from "../../redux/user/user.actions";
import { userActions } from "../../redux/user/user.actions";
import { ReactComponent as EyeIcon } from "../../assets/img/eye-icon.svg";
import LogoAboveBox from "../../components/Common/logo-above-box/logo-above-box.component";
import "./signup.styles.css";

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

const SignUp = ({ show, toggleShow }) => {
   const alert = useSelector((state) => state.alert);
   const localUser =
      localStorage.getItem("user") !== "undefined"
         ? JSON.parse(localStorage.getItem("user"))
         : undefined;

   const query = useQuery();
   const token = query.get("token");

   const settings = useSelector((state) => {
      return (
         state.settings &&
         state.settings.settings &&
         state.settings.settings.detail
      );
   });

   const [user, setUser] = useState({
      password: "",
      passwordConfirm: "",
      termsAndConditions: false,
      token,
   });
   const [submitted, setSubmitted] = useState(false);
   const [errors, setErrors] = useState({});
   const confirming = useSelector((state) => state.confirmation.confirming);
   const dispatch = useDispatch();

   useEffect(() => {
      history.listen((location, action) => {
         // clear alert on location change
         dispatch(alertActions.clear());
      });

      if (localUser && localUser.userObj.role === "Admin") {
         history.push("/dashboard");
      } else if (localUser) {
         history.push("/dashboard");
      }
   }, [localUser]);

   const handleChange = (e) => {
      const { name } = e.target;
      if (name === "password" || name === "passwordConfirm") {
         const { value } = e.target;
         setUser((user) => ({
            ...user,
            [name]: value,
         }));
      } else {
         const { checked } = e.target;
         setUser({ ...user, [name]: checked });
      }
      setErrors({ ...errors, [name]: "" });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      setErrors(validateSignup(user));
      console.log(errors);
      setSubmitted(true);
   };

   useEffect(() => {
      if (Object.keys(errors).length === 0 && submitted) {
         submit();
      }
   }, [errors]);

   const submit = () => {
      console.log("called", user);
      if (user.password && user.passwordConfirm && user.token) {
         console.log("call");
         const data = {
            newPassword: user.password,
            confirmPassword: user.passwordConfirm,
            token: user.token,
            acceptedTerms: true,
            signUp: true,
         };
         dispatch(userActions.confirmUser(data));
      }
   };

   const [displayTerms, setDisplayTerms] = useState(false);

   const handleTermsOfUse = () => {
      setDisplayTerms(true);
   };

   const closeDisplayTerms = () => setDisplayTerms(false);

   useEffect(() => {
      dispatch(userActions.getSettings());
   }, []);

   // <div className="body-content">{settings}</div>

   const termsAndConditions = () => {
      return (
         <Modal
            scrollable={true}
            show={displayTerms}
            onHide={closeDisplayTerms}
            className="term-use"
         >
            <Modal.Header closeButton>
               <Modal.Title>
                  <FormattedMessage
                     defaultMessage="Terms and conditions"
                     id="pageSignupTermsHeader"
                  />
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {
                  //   <div class="second-heading-para">
                  //   <p>
                  //     Welcome to SpiralMath question database. Thank you for agreeing to
                  //     help with the creating, entering, and reviewing questions and
                  //     answers.
                  //   </p>
                  //   <p>Please consider carefully the terms listed below:</p>
                  // </div>
                  // <div className="body-content">
                  //   <ul>
                  //     <li>
                  //       • The questions and answers (Q&amp;A) you enter into the
                  //       database must be from a known source.
                  //     </li>
                  //     <li>
                  //       • You must know who created them, and you will be asked to enter
                  //       the creator’s name along with the question content.
                  //     </li>
                  //     <li>
                  //       • You acknowledge that the Q&amp;A was not copied from a
                  //       copyrighted textbook, workbook, worksheet or other source. Also
                  //       the Q&amp;A was not given to you by another person in a manner
                  //       that leaves you uncertain about its source or Copyright status.
                  //     </li>
                  //     <li>
                  //       • You acknowledge that the creator of the Q&amp;A has given you
                  //       permission to enter the content into the SpiralMath database
                  //       under these terms.
                  //     </li>
                  //     <li>
                  //       • The creator of the Q&amp;A will retain ownership of the
                  //       Copyright.
                  //     </li>
                  //     <li>
                  //       • The creator hereby assigns to SpiralMath a license to use the
                  //       Q&A, without time limit, in this database and any other
                  //       SpiralMath products and services.
                  //     </li>
                  //   </ul>
                  // </div>
                  // <div className="bottom-text">
                  //   <p>
                  //     If you have questions about any of these terms, please send us an
                  //     email at the contact address below.
                  //   </p>
                  //   <p>
                  //     If you agree to these terms please click on “Agree and continue.”
                  //   </p>
                  //   <p>If you do not agree with these terms, please click on “Quit.”</p>
                  //   <p>Thank you for participating.</p>
                  // </div>
                  // <div className="bottom-text-2">
                  //   <p>Contact david.robson@spiralmath.net</p>
                  //   <p>
                  //     SpiralMath.net is a service of Formative Assessment and Analytics,
                  //     LLC
                  //   </p>
                  // </div>
               }

               {settings ? parse(settings.replace("<br>", "<br/>")) : null}
            </Modal.Body>
         </Modal>
      );
   };
   const [passwordType1, setPasswordType1] = useState("password");
   const handlePasswordVisibility1 = () => {
      if (passwordType1 === "password") setPasswordType1("text");
      else setPasswordType1("password");
   };
   const [passwordType2, setPasswordType2] = useState("password");
   const handlePasswordVisibility2 = () => {
      if (passwordType2 === "password") setPasswordType2("text");
      else setPasswordType2("password");
   };
   const handleClearMessage = () => {
      dispatch(alertActions.clear());
   };

   return (
      <React.Fragment>
         <Row>
            <Col className="mt-3">
               <LogoAboveBox />
               {alert.type === "alert-danger" ? (
                  <div
                     className="w-75 error-msg"
                     onMouseEnter={handleClearMessage}
                  >
                     <p className="text-center">{alert.message}</p>
                  </div>
               ) : (
                  ""
               )}

               <div className="form-container w-50">
                  <h1 className="text-center mb-3 form-heading">
                     <FormattedMessage
                        defaultMessage="Create Your Account"
                        id="pageSignupCreateYourAccount"
                     />
                  </h1>

                  <Form
                     className="text-center"
                     onSubmit={handleSubmit}
                     noValidate
                  >
                     <Form.Group
                        controlId="formPassword"
                        className="relative create-password-field"
                     >
                        <Form.Control
                           type={passwordType1}
                           className={`input-style input-text ${
                              user.password.length && "label-up"
                           }`}
                           name="password"
                           value={user.password}
                           onChange={handleChange}
                        />
                        <span className="floating-label">
                           <FormattedMessage
                              defaultMessage="Create Password"
                              id="pageSignupPasswordLabel"
                           />
                        </span>
                        <span
                           className="eye-icon"
                           onClick={handlePasswordVisibility1}
                        >
                           <EyeIcon />
                        </span>
                        {submitted && errors.password && (
                           <div className="text-danger">{errors.password}</div>
                        )}
                     </Form.Group>

                     <Form.Group
                        controlId="formConfirmPassword"
                        className="relative"
                     >
                        <Form.Control
                           type={passwordType2}
                           className={`input-style input-text ${
                              user.passwordConfirm.length && "label-up"
                           }`}
                           name="passwordConfirm"
                           value={user.passwordConfirm}
                           onChange={handleChange}
                        />
                        <span className="floating-label">
                           <FormattedMessage
                              defaultMessage="Confirm Password"
                              id="pageSignupPasswordConfirmLabel"
                           />
                        </span>
                        <span
                           className="eye-icon"
                           onClick={handlePasswordVisibility2}
                        >
                           <EyeIcon />
                        </span>
                        {submitted && errors.passwordConfirm && (
                           <div className=" text-danger">
                              {errors.passwordConfirm}
                           </div>
                        )}
                     </Form.Group>

                     <Form.Group className="ml-4" controlId="formBasicCheckbox">
                        <div className="signup-checkbox">
                           <Form.Check.Input
                              type="checkbox"
                              name="termsAndConditions"
                              checked={user.termsAndConditions}
                              value={user.termsAndConditions}
                              onChange={handleChange}
                           />
                           <Form.Check.Label>
                              <FormattedMessage
                                 defaultMessage="I have read and accept the"
                                 id="pageSignupIhaveread"
                              />
                              &nbsp;
                           </Form.Check.Label>
                           <span className="checkmark"></span>
                           <span
                              className="text-orange tou pointerType"
                              onClick={handleTermsOfUse}
                           >
                              <FormattedMessage
                                 defaultMessage="Terms of Use"
                                 id="pageSignupTermsLink"
                              />
                           </span>
                           {submitted && errors.termsAndConditions && (
                              <div className="text-danger">
                                 {errors.termsAndConditions}
                              </div>
                           )}
                        </div>
                     </Form.Group>

                     <Button
                        variant="primary"
                        type="submit"
                        className="custom-btn"
                     >
                        {confirming && (
                           <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        <FormattedMessage
                           defaultMessage="Sign up"
                           id="pageSignupSignupLink"
                        />
                     </Button>
                  </Form>

                  <p className="mt-2 text-center login-text">
                     <FormattedMessage
                        defaultMessage="Already have an account? "
                        id="pageSignupAlreadyHave"
                     />
                     <Link to="/login">
                        <span className="text-orange pointerType">
                           <FormattedMessage
                              defaultMessage="Login"
                              id="pageSignupLoginLink"
                           />
                        </span>
                     </Link>
                  </p>
               </div>
            </Col>
         </Row>
         {displayTerms ? termsAndConditions() : ""}
      </React.Fragment>
   );
};

export default SignUp;
