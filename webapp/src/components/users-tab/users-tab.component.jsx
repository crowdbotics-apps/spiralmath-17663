import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Form, Button } from "react-bootstrap";

import { userActions } from "../../redux/user/user.actions";
import validateCreateUser from "../../helpers/validation/validateCreateUser";
import "./users-tab.styles.css";

const buttons = () => (
  <React.Fragment>
    <Button variant="light">Delete</Button>
    <Button variant="light">Edit</Button>
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
      <Form>
        <Form.Row>
          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name="firstName"
              value={userForm.firstName}
              onChange={handleChange}
            />
            {submitted && errors.firstName && (
              <div className="text-danger">firstName is required</div>
            )}
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              name="lastName"
              value={userForm.lastName}
              onChange={handleChange}
            />
            {submitted && errors.lastName && (
              <div className="text-danger">lastName is required</div>
            )}
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationEmail">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              placeholder="Email"
              required
              name="email"
              value={userForm.email}
              onChange={handleChange}
            />
            {submitted && errors.email && (
              <div className="text-danger">email is required</div>
            )}
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="exampleForm.SelectCustom">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              custom
              name="role"
              value={userForm.role}
              onChange={handleChange}
            >
              <option>SystemAdministrator</option>
              <option>Author</option>
              <option>Reviewer</option>
            </Form.Control>
          </Form.Group>

          <Button type="submit" onClick={handleSubmit}>
            {registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Create
          </Button>
          <Button onClick={handleCloseForm}>Close</Button>
        </Form.Row>
      </Form>
    );
  };

  const userTable = () => {
    return (
      <Row>
        <Col className="mt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Id</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th onClick={handleCloseForm} className="pointerType">
                  Create User
                </th>
              </tr>
            </thead>
            <tbody>
              {usersListArrayPreview
                ? usersListArrayPreview.map(
                    ({ id, name, email, role, status, buttons }) => {
                      return (
                        <tr key={id}>
                          <td>{id}</td>
                          <td>{name}</td>
                          <td>{email}</td>
                          <td>{role}</td>
                          <td>
                            {status}
                            <Form.Check type="switch" id={`${id}`} label="" />
                          </td>
                          <td>{buttons()}</td>
                        </tr>
                      );
                    }
                  )
                : ""}
            </tbody>
          </Table>
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
