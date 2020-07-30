import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Form, Button, Modal } from "react-bootstrap";

import Pagination from "../pagination/pagination.component";
import { userActions } from "../../redux/user/user.actions";
import { validateCreateUser } from "../../helpers/validation/validateCreateUser";
import "./users-tab.styles.css";

const UsersTab = () => {
  const deletingUser = useSelector((state) => state.users.deletingUser);

  const buttons = (id, user) => (
    <React.Fragment>
      <div className="d-flex justify-content-end">
        <div className="ml-2 cursor-pointer" onClick={() => handleShow(id)}>
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

        <div
          className="cursor-pointer ml-4"
          onClick={() => handleEditForm(user)}
        >
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

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const usersListArray = users ? users : [];
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
        first_name,
        last_name,
      })
    );

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(1);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers =
    usersListArrayPreview &&
    usersListArrayPreview.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(userActions.getAllUsers());
  }, []);

  const [userForm, setUserForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "Author",
    edit: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const updatingUser = useSelector((state) => state.users.updatingUser);
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
      if (!userForm.edit) {
        dispatch(
          userActions.register({
            first_name: userForm.firstName,
            last_name: userForm.lastName,
            email: userForm.email,
            role: userForm.role,
          })
        );
        setUserForm({ firstName: "", lastName: "", email: "", role: "Author" });
      } else {
        dispatch(
          userActions.updateUser({
            id: userForm.id,
            first_name: userForm.firstName,
            last_name: userForm.lastName,
            email: userForm.email,
            role: userForm.role,
          })
        );
        setUserForm({ firstName: "", lastName: "", email: "", role: "Author" });
      }
    }
  };

  const [closeForm, setCloseForm] = useState(false);

  const handleCloseForm = () => {
    if (closeForm === true) {
      setUserForm({ firstName: "", lastName: "", email: "", role: "Author" });
    }

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
                <p className="text-danger form-text-danger">
                  First name is required
                </p>
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
                <p className="text-danger form-text-danger">
                  Last name is required
                </p>
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
                <p className="text-danger form-text-danger">
                  Email is required
                </p>
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
            {(registering || updatingUser) && (
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
                    <span>
                      <svg
                        width="10"
                        height="9"
                        viewBox="0 0 10 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.5625 9L5.5625 2.1375L8.7125 5.2875L9.5 4.5L5 0L0.5 4.5L1.2875 5.2875L4.4375 2.1375L4.4375 9L5.5625 9Z"
                          fill="#3C7EBF"
                        />
                      </svg>
                    </span>
                    Status
                  </th>
                  <th
                    scope="col"
                    className="d-flex align-items-center justify-content-end border-0 font-style create-user pointerType"
                    onClick={handleCloseForm}
                  >
                    <span className="create-user-icon ipad-create-user-icon">
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
                {currentUsers ? (
                  currentUsers.map(
                    ({
                      id,
                      name,
                      email,
                      role,
                      status,
                      buttons,
                      first_name,
                      last_name,
                    }) => {
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

                          <td className="border-left-0">
                            {buttons(id, {
                              id,
                              first_name,
                              last_name,
                              email,
                              role,
                            })}
                          </td>
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
            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={users ? users.length : 0}
              paginate={paginate}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const [show, setShow] = useState({ userType: "" });

  const handleClose = () => setShow({ ...show, showModal: false });
  const handleShow = (id) => setShow({ ...show, showModal: true, id });

  const handleDeleteUser = (id) => {
    dispatch(userActions.deleteUser(id));
  };

  const handleDeleteModal = (id) => {
    return (
      <Modal
        show={show.showModal}
        onHide={handleClose}
        className="delete-modal"
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="justify-content-center">
          <Modal.Title id="contained-modal-title-vcenter">
            Are You Sure
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-muted user-type-content">
            User with id {id} will be removed
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className="popup-close-btn">
            Close
          </Button>
          <Button
            variant="primary"
            className="popup-save-btn"
            onClick={() => handleDeleteUser(id)}
          >
            {deletingUser && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleEditForm = (user) => {
    setUserForm({
      ...userForm,
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      edit: true,
    });
    handleCloseForm();
  };

  return (
    <React.Fragment>
      {closeForm ? createUserForm() : ""}
      {show ? handleDeleteModal(show.id) : ""}
      {userTable()}
    </React.Fragment>
  );
};

export default UsersTab;
