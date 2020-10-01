import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import validate from "../../helpers/validation/validateLogin";
import { userActions } from "../../redux/user/user.actions";
import { alertActions } from "../../redux/user/user.actions";
import { ReactComponent as EyeIcon } from "../../assets/img/eye-icon.svg";
import LogoAboveBox from "../../components/Common/logo-above-box/logo-above-box.component";

const Login = () => {
   const history = useHistory();
   const alert = useSelector((state) => state.alert);
   const [inputs, setInputs] = useState({
      email: "",
      password: "",
   });
   const [passwordType, setPasswordType] = useState("password");
   const [submitted, setSubmitted] = useState(false);
   const [errors, setErrors] = useState({});
   const { email, password } = inputs;
   const loggingIn = useSelector((state) => state.authentication.loggingIn);
   const localUser =
      localStorage.getItem("user") !== "undefined"
         ? JSON.parse(localStorage.getItem("user"))
         : undefined;

   const dispatch = useDispatch();

   // reset login status
   useEffect(() => {
      history.listen((location, action) => {
         // clear alert on location change
         dispatch(alertActions.clear());
      });

      if (localUser) {
         history.push("/dashboard");
      }
   }, [localUser]);

   useEffect(() => {
      if (Object.keys(errors).length === 0 && submitted) {
         submit();
      }
   }, [errors]);

   function handleChange(e) {
      const { name, value } = e.target;
      setInputs((inputs) => ({ ...inputs, [name]: value }));
      setErrors({ ...errors, [name]: "" });
   }

   function handleSubmit(e) {
      e.preventDefault();
      setErrors(validate(inputs));
      setSubmitted(true);
   }

   const submit = () => {
      if (email && password) {
         dispatch(userActions.login(email, password));
         setInputs({ email: "", password: "" });
      }
   };

   const handlePasswordVisibility = () => {
      if (passwordType === "password") setPasswordType("text");
      else setPasswordType("password");
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
                  <h1 className="text-center form-heading">
                     <FormattedMessage
                        id="pageLoginHeader"
                        defaultMessage="Welcome Back"
                        description="header of login page"
                     />
                  </h1>

                  <Form
                     className="text-center"
                     onSubmit={handleSubmit}
                     noValidate
                  >
                     <Form.Group controlId="formEmail" className="relative">
                        <Form.Control
                           type="email"
                           className={`input-style input-text ${
                              email.length && "label-up"
                           }`}
                           name="email"
                           value={email}
                           onChange={handleChange}
                        />
                        <span className="floating-label">
                           <FormattedMessage
                              id="pageLoginEmailLabel"
                              defaultMessage="Email"
                           />
                        </span>
                        {submitted && errors.email && (
                           <div className="text-danger">{errors.email}</div>
                        )}
                     </Form.Group>

                     <Form.Group
                        controlId="formConfirmPassword"
                        className="relative"
                     >
                        <Form.Control
                           type={passwordType}
                           className={`input-style input-text ${
                              password.length && "label-up"
                           }`}
                           name="password"
                           value={password}
                           onChange={handleChange}
                        />
                        <span className="floating-label">
                           <FormattedMessage
                              defaultMessage="Password"
                              id="pageLoginPasswordLabel"
                           />
                        </span>
                        <span
                           className="eye-icon"
                           onClick={handlePasswordVisibility}
                        >
                           <EyeIcon />
                        </span>
                        {submitted && errors.password && (
                           <div className="text-danger">{errors.password}</div>
                        )}
                     </Form.Group>

                     <Button
                        variant="primary"
                        type="submit"
                        className="text-center custom-btn"
                     >
                        {loggingIn && (
                           <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        <FormattedMessage
                           defaultMessage="Log In"
                           id="pageLoginLoginButton"
                        />
                     </Button>
                  </Form>
                  <p className="mt-2 text-center login-text">
                     <FormattedMessage
                        defaultMessage="Forgot Password? "
                        id="pageLoginForgotPassword"
                     />
                     <Link to="/forgot-password">
                        <span className="text-orange pointerType">
                           <FormattedMessage
                              defaultMessage="Reset"
                              id="pageLoginResetPasswordLink"
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

export default Login;
