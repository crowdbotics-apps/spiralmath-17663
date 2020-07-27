import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Form, Button } from "react-bootstrap";

import { userActions } from "../../redux/user/user.actions";
import validateCreateUser from "../../helpers/validation/validateCreateUser";

const buttons = () => (
  <React.Fragment>
    <Button variant="light">Delete</Button>
    <Button variant="light">Edit</Button>
  </React.Fragment>
);

const userTypeArray = [
  {
    userType: "System Administrator",
    description: "Can create and review questions",
    buttons,
  },
  {
    userType: "Reviewer",
    description: "Can review questions",
    buttons,
  },
];

const UsersTab = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   dispatch(userActions.getAllUsers());
  // }, []);

  const [userForm, setUserForm] = useState({
    userType: "",
    createQuestion: true,
    reviewQuestion: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    let checked;

    if (name !== "userType") {
      checked = e.target.checked;
    }

    console.log(value);

    setUserForm((userForm) => ({
      ...userForm,
      [name]: value,
    }));
    setErrors({ ...errors, userType: "" });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateCreateUser(userForm));
    setSubmitted(true);
  }

  useEffect(() => {
    const submit = () => {
      if (
        userForm.userType &&
        userForm.createQuestion &&
        userForm.reviewQuestion
      ) {
        dispatch(userActions.register(userForm));
        setUserForm({
          userType: "",
          createQuestion: true,
          reviewQuestion: false,
        });
      }
    };

    if (Object.keys(errors).length === 0 && submitted) {
      submit();
    }
  }, [errors]);

  const [closeForm, setCloseForm] = useState(false);

  const handleCloseForm = () => {
    setCloseForm(!closeForm);
  };

  const createUserTypeForm = () => {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Control
              required
              type="text"
              placeholder="UserType"
              name="userType"
              value={userForm.userType}
              onChange={handleChange}
            />
            {submitted && errors.userType && (
              <div className="text-danger">User type is required</div>
            )}
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Check
              type="switch"
              id="createQuestion"
              name="createQuestion"
              checked={userForm.createQuestion}
              onChange={handleChange}
              label="Can create question"
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationEmail">
            <Form.Check
              type="switch"
              id="reviewQuestion"
              name="reviewQuestion"
              checked={userForm.reviewQuestion}
              onChange={handleChange}
              label="Can review question"
            />
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

  const userTypesTable = () => {
    return (
      <Row>
        <Col className="mt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Type</th>
                <th>Description</th>
                <th onClick={handleCloseForm} className="pointerType">
                  Create User
                </th>
              </tr>
            </thead>
            <tbody>
              {userTypeArray
                ? userTypeArray.map(({ userType, description, buttons }) => {
                    return (
                      <tr key={userType}>
                        <td>{userType}</td>
                        <td>{description}</td>
                        <td>{buttons()}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  };

  return (
    <React.Fragment>
      {closeForm ? createUserTypeForm() : ""}
      {userTypesTable()}
    </React.Fragment>
  );
};

export default UsersTab;
