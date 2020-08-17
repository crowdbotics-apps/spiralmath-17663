import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Form, Button, Modal } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";

import Pagination from "../pagination/pagination.component";
import { userActions, alertActions } from "../../redux/user/user.actions";
import { validateCreateUserTypes } from "../../helpers/validation/validateCreateUser";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";
import { ReactComponent as CreateUserIcon } from "../../assets/img/create-user-icon.svg";

const UserTypes = () => {
  const buttons = (userType, userTypeObject) => (
    <React.Fragment>
      <div className="d-flex justify-content-end">
        <div
          className="ml-2 cursor-pointer"
          onClick={() => handleShow(userType, userTypeObject.id)}
        >
          <DeleteIcon />
        </div>

        <div
          className="cursor-pointer ml-4"
          onClick={() => handleEditForm(userTypeObject)}
        >
          <EditIcon />
        </div>
      </div>
    </React.Fragment>
  );

  const userTypesState = useSelector((state) => state.userTypes.allUserTypes);
  let successMessage = useSelector((state) => state.alert.message);
  let messageType = useSelector((state) => state.alert.type);
  const deletingUserType = useSelector(
    (state) => state.userTypes.deletingUserType
  );
  const userTypeCreating = useSelector(
    (state) => state.userTypes.userTypeCreating
  );
  const updatingUserType = useSelector(
    (state) => state.userTypes.updatingUserType
  );

  const dispatch = useDispatch();
  const intl = useIntl();
  const [errors, setErrors] = useState({});

  const userTypeArray = userTypesState.map(
    ({ id, create_questions, review_questions, name }) => {
      const description = ((create_questions, review_questions) => {
        if (create_questions && review_questions) {
          return intl.formatMessage({
            defaultMessage: "Can create and review questions",
            id: "componentUserTypesDescription1",
          });
        } else if (create_questions) {
          return intl.formatMessage({
            defaultMessage: "Can create questions",
            id: "componentUserTypesDescription2",
          });
        } else if (review_questions) {
          return intl.formatMessage({
            defaultMessage: "Can review questions",
            id: "componentUserTypesDescription3",
          });
        }
      })(create_questions, review_questions);

      return {
        id,
        create_questions,
        review_questions,
        description,
        userType: name,
        buttons,
      };
    }
  );

  const [userForm, setUserForm] = useState({
    id: "",
    userType: "",
    createQuestions: false,
    reviewQuestions: false,
    edit: false,
  });
  const [submitted, setSubmitted] = useState(false);

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
            createQuestions: false,
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
            createQuestions: false,
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

  const [closeForm, setCloseForm] = useState(true);

  const handleCloseForm = () => {
    if (closeForm === true) {
      setUserForm({
        userType: "",
        createQuestions: false,
        reviewQuestions: false,
        id: "",
        edit: "",
      });
    }
    setCloseForm(!closeForm);
  };

  useEffect(() => {
    if (!updatingUserType) handleCloseForm();
  }, [updatingUserType]);

  useEffect(() => {
    if (!userTypeCreating) handleCloseForm();
  }, [userTypeCreating]);

  const createUserTypeForm = () => {
    return (
      <React.Fragment>
        <Form noValidate onSubmit={handleSubmit}>
          <div className="px-4 py-4 border form-border">
            <Form.Row>
              <Form.Group as={Col} md="3" controlId="validationCustom01">
                <Form.Control
                  required
                  type="text"
                  placeholder={intl.formatMessage({
                    defaultMessage: "User Type",
                    id: "componentUserTypesUserTypeLabel",
                  })}
                  name="userType"
                  value={userForm.userType}
                  onChange={handleChange}
                  className="border-top-0 border-left-0 border-right-0 rounded-0"
                />
                {submitted && errors.userType && (
                  <p className="text-danger form-text-danger">
                    {errors.userType}
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
                  label={intl.formatMessage({
                    defaultMessage: "Can Create Questions",
                    id: "componentUserTypesCreateQuestionsLabel",
                  })}
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
                  label={intl.formatMessage({
                    defaultMessage: "Can Review Questions",
                    id: "componentUserTypesReviewQuestionsLabel",
                  })}
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
              <FormattedMessage
                id="componentUserTypesCancelButton"
                defaultMessage="Cancel"
              />
            </Button>
            <Button type="submit" className="save-btn">
              {(userTypeCreating || updatingUserType) && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              <FormattedMessage
                defaultMessage="Save"
                id="componentUserTypesSaveButton"
              />
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  };

  const handleClearMessage = () => {
    dispatch(alertActions.clear());
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [userTypePerPage] = useState(10);
  const indexOfLastUserType = currentPage * userTypePerPage;
  const indexOfFirstUserType = indexOfLastUserType - userTypePerPage;
  const currentUserTypes =
    userTypeArray &&
    userTypeArray.slice(indexOfFirstUserType, indexOfLastUserType);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const userTypesTable = () => {
    return (
      <Row>
        <Col className="mt-3">
          <Table striped bordered hover className="border-0">
            <thead>
              <tr>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="User Type"
                    id="componentUserTypesTableHeadUserTypes"
                  />
                </th>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Description"
                    id="componentUserTypesTableHeadDescription"
                  />
                </th>

                <th
                  scope="col"
                  className="d-flex align-items-center justify-content-end border-0 font-style create-user pointerType"
                  onClick={handleCloseForm}
                >
                  <span className="create-user-icon">
                    <CreateUserIcon />
                  </span>
                  <b>
                    <FormattedMessage
                      defaultMessage="Create User Type"
                      id="componentUserTypesTableHeadCreateUserType"
                    />
                  </b>
                </th>
              </tr>
            </thead>
            <tbody>
              {console.log(currentUserTypes)}
              {currentUserTypes
                ? currentUserTypes.map(
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
          <Pagination
            usersPerPage={userTypePerPage}
            totalUsers={userTypeArray ? userTypeArray.length : 0}
            paginate={paginate}
          />
        </Col>
      </Row>
    );
  };

  const [show, setShow] = useState({ userType: "" });

  const handleClose = () => setShow({ ...show, showModal: false });
  const handleShow = (userType, id) =>
    setShow({ ...show, showModal: true, userType, id });

  const handleDeleteUserType = (id) => {
    dispatch(userActions.deleteUserType(id));

    if (!deletingUserType) {
      handleClose();
    }
  };

  const handleDeleteModal = (userType, id) => {
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
            <FormattedMessage
              defaultMessage="Are You Sure? "
              id="componentUserTypesDeleteModalHeader"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-muted user-type-content">
            <FormattedMessage
              defaultMessage="User Type will be deleted."
              id="componentUserTypesDeleteModalWarning"
            />
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className="popup-close-btn">
            <FormattedMessage
              defaultMessage="Cancel"
              id="componentUserTypesDeleteModalCancelButton"
            />
          </Button>
          <Button
            variant="primary"
            className="popup-save-btn"
            onClick={() => handleDeleteUserType(id)}
          >
            {deletingUserType && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            <FormattedMessage
              defaultMessage="Confirm"
              id="componentUserTypesDeleteModalConfirmButton"
            />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleEditForm = (userType) => {
    setUserForm({
      ...userForm,
      id: userType.id,
      userType: userType.userType,
      createQuestions: userType.create_questions,
      reviewQuestions: userType.review_questions,
      edit: true,
    });
    handleCloseForm();
  };

  return (
    <React.Fragment>
      {closeForm ? createUserTypeForm() : ""}
      {successMessage && (
        <Row>
          <Col className="mt-3">
            <p
              className={
                "form-text-danger text-success" + messageType ===
                "alert-success"
                  ? " text-danger"
                  : " text-success"
              }
              onMouseEnter={handleClearMessage}
            >
              {successMessage}
            </p>
          </Col>
        </Row>
      )}
      {show ? handleDeleteModal(show.userType, show.id) : ""}
      {userTypesTable()}
    </React.Fragment>
  );
};

export default UserTypes;
