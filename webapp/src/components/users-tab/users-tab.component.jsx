import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Form, Button } from "react-bootstrap";

import { userActions } from "../../redux/user/user.actions";
import { validateCreateUser } from "../../helpers/validation/validateCreateUser";
import "./users-tab.styles.css";

const buttons = () => (
  <React.Fragment>
    <div className="d-flex align-equal">
      <div>
        <svg
          width="13"
          height="17"
          viewBox="0 0 13 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9401 3.96753H1.54012V14.3675C1.54012 15.3243 2.31665 16.1009 3.27432 16.1009H10.2068C11.1653 16.1009 11.9401 15.3243 11.9401 14.3675V3.96753ZM8.90678 0.5H4.57345L3.70765 1.36753H1.54012C1.06258 1.36753 0.674316 1.7558 0.674316 2.23333V3.10087H12.8076V2.23333C12.8076 1.7558 12.4194 1.36753 11.9401 1.36753H9.77432L8.90678 0.5Z"
              fill="#494949"
            />
          </g>
        </svg>
      </div>

      <div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.2753 4.56006C17.5912 4.87596 17.5912 5.38626 17.2753 5.70216L15.793 7.18446L12.7555 4.14696L14.2378 2.66466C14.5537 2.34876 15.064 2.34876 15.3799 2.66466L17.2753 4.56006ZM2.93018 17.0098V13.9723L11.8888 5.01366L14.9263 8.05116L5.96768 17.0098H2.93018Z"
              fill="#494949"
            />
          </g>
        </svg>
      </div>
    </div>
  </React.Fragment>
);

const UsersTab = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const usersListArray = users ? users.results : [];
  const usersListArrayPreview =
    usersListArray &&
    usersListArray.map(
      ({ id, first_name, last_name, email, role, status }) => ({
        id,
        name: first_name + " " + last_name,
        email,
        role,
        status,
        buttons,
      })
    );

  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   dispatch(userActions.getAllUsers());
  // }, []);

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Author",
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserForm((userForm) => ({ ...userForm, [name]: value }));
    setErrors({ ...errors, [name]: "" });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateCreateUser(userForm));
    setSubmitted(true);
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      submit();
    }
  }, [errors]);

  const submit = () => {
    if (
      userForm.firstName &&
      userForm.lastName &&
      userForm.email &&
      userForm.role
    ) {
      dispatch(userActions.register(userForm));
      setUserForm({ firstName: "", lastName: "", email: "", role: "Author" });
    }
  };

  const [closeForm, setCloseForm] = useState(false);

  const handleCloseForm = () => {
    setCloseForm(!closeForm);
  };

  const createUserForm = () => {
    return (
      <Form noValidate onSubmit={handleSubmit}>
        <div className="px-4 py-4 border form-border">
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                placeholder="First name"
                name="firstName"
                value={userForm.firstName}
                onChange={handleChange}
                className="border-top-0 border-left-0 border-right-0 rounded-0"
              />
              {submitted && errors.firstName && (
                <p className="text-danger">firstName is required</p>
              )}
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="lastName"
                value={userForm.lastName}
                onChange={handleChange}
                className="border-top-0 border-left-0 border-right-0 rounded-0"
              />
              {submitted && errors.lastName && (
                <p className="text-danger">lastName is required</p>
              )}
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                required
                name="email"
                value={userForm.email}
                onChange={handleChange}
                className="border-top-0 border-left-0 border-right-0 rounded-0"
              />
              {submitted && errors.email && (
                <p className="text-danger">Email is required</p>
              )}
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="exampleForm.SelectCustom">
              <Form.Control
                as="select"
                custom
                name="role"
                value={userForm.role}
                onChange={handleChange}
                className="border-top-0 border-left-0 border-right-0 rounded-0"
              >
                <option>SystemAdministrator</option>
                <option>Author</option>
                <option>Reviewer</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </div>
        <div className="my-4 d-flex justify-content-end bottom-btn-grp">
          <Button onClick={handleCloseForm} className="mr-4 cancel-btn">
            Cancel
          </Button>
          <Button type="submit" className="save-btn">
            {registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Save
          </Button>
        </div>
      </Form>
    );
  };

  const userTable = () => {
    return (
      <Row>
        <Col className="mt-3">
          <div>
            <Table
              bordered
              className="border-top-0 border-left-0 border-right-0"
            >
              <thead>
                <tr>
                  <th scope="col" className="border-0 font-style thead">
                    User Id
                  </th>
                  <th scope="col" className="border-0 font-style thead">
                    User
                  </th>
                  <th scope="col" className="border-0 font-style thead">
                    Email
                  </th>
                  <th scope="col" className="border-0 font-style thead">
                    Role
                  </th>
                  <th
                    scope="col"
                    className="border-0 font-style thead status-color"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="d-flex align-items-center border-0 font-style create-user pointerType"
                    onClick={handleCloseForm}
                  >
                    <span className="create-user-icon">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.98394 0.705078V4.98394H0.705078V6.41022H4.98394V10.6891H6.41022V6.41022H10.6891V4.98394H6.41022V0.705078H4.98394Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <b>Create User</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersListArrayPreview ? (
                  usersListArrayPreview.map(
                    ({ id, name, email, role, status, buttons }) => {
                      return (
                        <tr key={id}>
                          <td className="border-right-0">{id}</td>
                          <td className="border-right-0 border-left-0">
                            {name}
                          </td>
                          <td className="border-right-0 border-left-0">
                            {email}
                          </td>
                          <td className="border-right-0 border-left-0">
                            {role}
                          </td>
                          <td className="border-right-0 border-left-0">
                            <span className="d-flex justify-content-around">
                              {status}
                              <Form.Check type="switch" id={`${id}`} label="" />
                            </span>
                          </td>

                          <td className="border-left-0">{buttons()}</td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td>No User</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    );
  };
  return (
    <React.Fragment>
      {closeForm ? createUserForm() : ""}
      {userTable()}
    </React.Fragment>
  );
};

export default UsersTab;