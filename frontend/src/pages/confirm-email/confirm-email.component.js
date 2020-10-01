import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import { validateReset } from "../../helpers/validation/validationSignUp";
import { history } from "../../helpers/history";
import { alertActions } from "../../redux/user/user.actions";
import { userActions } from "../../redux/user/user.actions";
import LogoAboveBox from "../../components/Common/logo-above-box/logo-above-box.component";
import { ReactComponent as EyeIcon } from "../../assets/img/eye-icon.svg";
import "../signup/signup.styles.css";

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

const ConfirmEmail = ({ show, toggleShow }) => {
   const alert = useSelector((state) => state.alert);
   const localUser =
      localStorage.getItem("user") !== "undefined"
         ? JSON.parse(localStorage.getItem("user"))
         : undefined;

   const query = useQuery();
   const token = query.get("token");

   const [user, setUser] = useState({
      password: "",
      passwordConfirm: "",
      token,
   });
   const [submitted, setSubmitted] = useState(false);
   const [errors, setErrors] = useState({});
   const resetingPassword = useSelector(
      (state) => state.resetUserPassword.resetingPassword
   );
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
      const { name, value } = e.target;

      setUser((user) => ({
         ...user,
         [name]: value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      setErrors(validateReset(user));
      console.log(errors);
      setSubmitted(true);
   };

   useEffect(() => {
      if (Object.keys(errors).length === 0 && submitted) {
         submit();
      }
   }, [errors]);

   const submit = () => {
      if (user.password && user.passwordConfirm && user.token) {
         const data = {
            newPassword: user.password,
            confirmPassword: user.passwordConfirm,
            token: user.token,
            acceptedTerms: true,
            signUp: false,
         };
         dispatch(userActions.resetUserPassword(data));
      }
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
                        defaultMessage="Reset Your Password"
                        id="pageConfirmEmailResetYourPassword"
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
                           <div className="text-danger">
                              {errors.passwordConfirm}
                           </div>
                        )}
                     </Form.Group>

                     <Button
                        variant="primary"
                        type="submit"
                        className="custom-btn"
                     >
                        {resetingPassword && (
                           <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        <FormattedMessage
                           defaultMessage="Reset Password"
                           id="pageResetLink"
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
      </React.Fragment>
   );
};

export default ConfirmEmail;
