import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Form, Button, Modal } from "react-bootstrap";

import { userActions } from "../../redux/user/user.actions";
import { validateCreateUserTypes } from "../../helpers/validation/validateCreateUser";

const UserTypes = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   dispatch(userActions.getAllUsers());
  // }, []);

  const [userForm, setUserForm] = useState({
    id: "",
    userType: "",
    createQuestions: true,
    reviewQuestions: false,
    edit: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const userTypeCreating = useSelector(
    (state) => state.userTypes.userTypeCreating
  );

  const handleChange = (e) => {
    const { name } = e.target;

    if (name === "userType") {
      const { value } = e.target;
      setUserForm((userForm) => ({
        ...userForm,
        [name]: value,
      }));
      setErrors({ ...errors, userType: "" });
    } else if (name === "createQuestions") {
      const { checked } = e.target;
      setUserForm({ ...userForm, [name]: checked });
    } else {
      const { checked } = e.target;
      setUserForm({ ...userForm, [name]: checked });
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateCreateUserTypes(userForm));
    setSubmitted(true);
  }

  useEffect(() => {
    const submit = () => {
      if (userForm.userType) {
        if (!userForm.edit) {
          dispatch(
            userActions.createUserType({
              name: userForm.userType,
              create_questions: userForm.createQuestions,
              review_questions: userForm.reviewQuestions,
            })
          );
          setUserForm({
            userType: "",
            createQuestions: true,
            reviewQuestions: false,
          });
        } else {
          dispatch(
            userActions.updateUserType({
              id: userForm.id,
              name: userForm.userType,
              create_questions: userForm.createQuestions,
              review_questions: userForm.reviewQuestions,
            })
          );
          setUserForm({
            userType: "",
            createQuestions: true,
            reviewQuestions: false,
            id: "",
            edit: "",
          });
        }
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
      <Form noValidate onSubmit={handleSubmit}>
        <div className="px-4 py-4 border form-border">
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <Form.Control
                required
                type="text"
                placeholder="First name"
                name="userType"
                value={userForm.userType}
                onChange={handleChange}
                className="border-top-0 border-left-0 border-right-0 rounded-0"
              />
              {submitted && errors.userType && (
                <p className="text-danger form-text-danger">
                  User Type is required
                </p>
              )}
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              className=" mt-2 text-right"
              controlId="create-questions"
            >
              <Form.Check
                type="switch"
                id="create-questions"
                label="Can Create Questions"
                name="createQuestions"
                checked={userForm.createQuestions}
                value={userForm.createQuestions}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              className=" mt-2 text-right"
              controlId="review-questions"
            >
              <Form.Check
                type="switch"
                id="review-questions"
                label="Can Review Questions"
                name="reviewQuestions"
                checked={userForm.reviewQuestions}
                value={userForm.reviewQuestions}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>
        </div>
        <div className="my-4 d-flex justify-content-end bottom-btn-grp">
          <Button onClick={handleCloseForm} className="mr-4 cancel-btn">
            Cancel
          </Button>
          <Button type="submit" className="save-btn">
            {userTypeCreating && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Save
          </Button>
        </div>
      </Form>
    );
  };

  const userTypesTable = () => {
    return (
      <Row>
        <Col className="mt-3">
          <Table striped bordered hover className="border-0">
            <thead>
              <tr>
                <th scope="col" className="border-0 font-style thead">
                  User Types
                </th>
                <th scope="col" className="border-0 font-style thead">
                  Description
                </th>

                <th
                  scope="col"
                  className="d-flex align-items-center justify-content-end border-0 font-style create-user pointerType"
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
                  <b>Create User Type</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {userTypeArray
                ? userTypeArray.map(
                    ({
                      userType,
                      description,
                      buttons,
                      id,
                      create_questions,
                      review_questions,
                    }) => {
                      return (
                        <tr key={userType}>
                          <td className="border-right-0">{userType}</td>
                          <td className="border-left-0 border-right-0">
                            {description}
                          </td>
                          <td className="border-left-0">
                            {buttons(userType, {
                              userType,
                              create_questions,
                              review_questions,
                              id,
                            })}
                          </td>
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

  const [show, setShow] = useState({ userType: "" });

  const handleClose = () => setShow({ ...show, showModal: false });
  const handleShow = (userType) =>
    setShow({ ...show, showModal: true, userType });

  const handleDeleteModal = (userType) => {
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
            User Type: {userType} will be removed
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className="popup-close-btn">
            Close
          </Button>
          <Button variant="primary" className="popup-save-btn">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleEditForm = (userType) => {
    setUserForm({
      ...userForm,
      id: userForm.id,
      userType: userForm.userType,
      createQuestions: userForm.createQuestions,
      reviewQuestions: userForm.reviewQuestions,
      edit: true,
    });
    handleCloseForm();
  };

  const buttons = (userType, userTypeObject) => (
    <React.Fragment>
      <div className="d-flex justify-content-end">
        <div
          className="ml-2 cursor-pointer"
          onClick={() => handleShow(userType)}
        >
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
          onClick={() => handleEditForm(userTypeObject)}
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

  const userTypeArray = [
    {
      userType: "System Administrator",
      description: "Can create and review questions",
      buttons,
      id: 1,
      create_questions: true,
      review_questions: true,
    },
    {
      userType: "Reviewer",
      description: "Can review questions",
      buttons,
      id: 2,
      create_questions: true,
      review_questions: true,
    },
  ];

  return (
    <React.Fragment>
      {closeForm ? createUserTypeForm() : ""}
      {show ? handleDeleteModal(show.userType) : ""}
      {userTypesTable()}
    </React.Fragment>
  );
};

export default UserTypes;
