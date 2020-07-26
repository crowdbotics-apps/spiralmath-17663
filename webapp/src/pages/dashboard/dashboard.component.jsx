import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Tabs,
  Tab,
  Navbar,
  Nav,
  Table,
  Form,
  Button,
} from "react-bootstrap";

import { userActions } from "../../redux/user/user.actions";
import validateCreateUser from "../../helpers/validation/validateCreateUser";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import "./dashboard.styles.css";

const buttons = () => (
  <React.Fragment>
    <Button variant="light">Delete</Button>
    <Button variant="light">Edit</Button>
  </React.Fragment>
);

const Dashboard = () => {
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

  const [key, setKey] = useState("home");
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   dispatch(userActions.getAllUsers());
  // }, []);

  const navbar = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <Logo />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">users Management</Nav.Link>
          <Nav.Link href="#home">
            <pre> </pre>
          </Nav.Link>
          <Tabs id="controlled-tab" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="dashboard" title="Home"></Tab>
            <Tab eventKey="users" title="Users"></Tab>
            <Tab eventKey="user-types" title="User Types"></Tab>
            <Tab eventKey="settings" title="Settings"></Tab>
          </Tabs>
        </Nav>
        User
      </Navbar>
    );
  };

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setUserForm((userForm) => ({ ...userForm, [name]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userForm.role);
    setSubmitted(true);
    if (
      userForm.firstName &&
      userForm.lastName &&
      userForm.email &&
      userForm.role
    ) {
      dispatch(userActions.register(userForm));
    }
  }

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
            {submitted && !userForm.passwordConfirm && (
              <div className="invalid-feedback">firstName is required</div>
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
      {navbar()}

      {closeForm ? createUserForm() : ""}
      {userTable()}
    </React.Fragment>
  );
};

export default Dashboard;
