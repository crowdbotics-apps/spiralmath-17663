import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, Form, Button, Modal } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";

import Pagination from "../pagination/pagination.component";
import DeleteModal from "../ui/delete-modal/delete-modal.component";
import MessageBar from "../ui/message-bar/message-bar.component";
import DeleteEditGroup from "../ui/delete-edit-group/delete-edit-group.component"
import { userActions, alertActions } from "../../redux/user/user.actions";
import { validateCreateUser } from "../../helpers/validation/validateCreateUser";
import { ReactComponent as DeleteIcon } from "../../assets/img/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";
import { ReactComponent as CreateUserIcon } from "../../assets/img/create-user-icon.svg";
import { ReactComponent as UpArrowIcon } from "../../assets/img/up-arrow-icon.svg";
import "./users-tab.styles.css";

const UsersTab = () => {
   const [updateStatus, setUpdateStatus] = useState({});
   const editFormRef = useRef(null);
   const deletingUser = useSelector((state) => state.users.deletingUser);
   const updatingUser = useSelector((state) => state.users.updatingUser);
   const registering = useSelector((state) => state.registration.registering);
   const errorKey = useSelector((state) => {
      return state.registration.key;
   });
   let errorMessage = useSelector((state) => {
      return state.registration.error;
   });
   let message = useSelector((state) => state.alert.message);
   let messageType = useSelector((state) => state.alert.type);
   const userTypesState = useSelector((state) => state.userTypes.allUserTypes);
   const users = useSelector((state) => state.users.users);

   const initialValue = {};
   const id1 = "id";

   const allUsersTypes = userTypesState.reduce((obj, item) => {
      return {
         ...obj,
         [item[id1]]: item,
      };
   }, initialValue);

   const intl = useIntl();
   const dispatch = useDispatch();
   const usersCount = useSelector((state) => state.users.count || 0);
   const usersListArray = users ? users : [];
   const usersListArrayPreview =
      usersListArray &&
      usersListArray.map(
         ({ id, first_name, last_name, email, user_type, status }) => ({
            id,
            name: first_name + " " + last_name,
            email,
            user_type,
            status,

            first_name,
            last_name,
         })
      );

   useEffect(() => {
      const usersListArray = users ? users : [];

      const allUsersStatusArray =
         usersListArray &&
         usersListArray.map(({ id, status }) => {
            return { id, status };
         });
      const allUsersStatus = allUsersStatusArray.reduce((obj, item) => {
         return {
            ...obj,
            [item[id1]]: item,
         };
      }, initialValue);
      setUpdateStatus(allUsersStatus);
   }, [users]);

   const [currentPage, setCurrentPage] = useState(1);
   const [usersPerPage] = useState(10);
   const currentUsers = usersListArrayPreview;

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   const [errors, setErrors] = useState({});

   useEffect(() => {
      if (!updatingUser && !registering && !deletingUser) {
         dispatch(userActions.getAllUsers((currentPage - 1) * 10));
      }
   }, [updatingUser, registering, currentPage, deletingUser,users]);

   const [userForm, setUserForm] = useState({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      role: intl.formatMessage({
         id: "componentUsersTabDefaultSelect1",
         defaultMessage: "Select Role",
      }),
      user_type: "",
      edit: false,
   });
   const [submitted, setSubmitted] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserForm((userForm) => ({ ...userForm, [name]: value }));
      setErrors({ ...errors, [name]: "" });
      errorMessage = "";
   };

   function handleSubmit(e) {
      e.preventDefault();
      setErrors(validateCreateUser(userForm));
      setSubmitted(true);
   }

   useEffect(() => {
      if (userForm.edit && editFormRef.current) {
         editFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
   }, [userForm.edit]);

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
                  user_type: parseInt(userForm.role),
               })
            );
            setUserForm({
               firstName: "",
               lastName: "",
               email: "",
               role: "Author",
            });
         } else {
            dispatch(
               userActions.updateUser({
                  id: userForm.id,
                  first_name: userForm.firstName,
                  last_name: userForm.lastName,
                  email: userForm.email,
                  role: userForm.role,
                  user_type: userForm.role,
               })
            );
            setUserForm({
               firstName: "",
               lastName: "",
               email: "",
               role: "Author",
            });
         }
      }
   };

   useEffect(() => {
      if (!updatingUser && !errorKey) handleCloseForm();
   }, [updatingUser]);

   useEffect(() => {
      if (!registering && !errorKey) handleCloseForm();
   }, [registering]);

   const [closeForm, setCloseForm] = useState(true);

   const handleCloseForm = () => {
      if (closeForm === true) {
         setUserForm({
            firstName: "",
            lastName: "",
            email: "",
            role: intl.formatMessage({
               id: "componentUsersTabDefaultSelect2",
               defaultMessage: "Select Role",
            }),
         });
      }

      setCloseForm(!closeForm);
   };

   const createUserForm = () => {
      return (
         <React.Fragment>
            <Form noValidate onSubmit={handleSubmit} ref={editFormRef}>
               <div className="px-4 py-4 border form-border">
                  <Form.Row>
                     <Form.Group as={Col} md="3" controlId="validationCustom01">
                        <Form.Control
                           required
                           type="text"
                           placeholder={intl.formatMessage({
                              id: "componentUsersTabFirstNameLabel",
                              defaultMessage: "First Name",
                           })}
                           name="firstName"
                           value={userForm.firstName}
                           onChange={handleChange}
                           className="border-top-0 border-left-0 border-right-0 rounded-0"
                           maxLength="50"
                        />
                        {submitted && errors.firstName && (
                           <p className="text-danger form-text-danger">
                              {errors.firstName}
                           </p>
                        )}
                     </Form.Group>

                     <Form.Group as={Col} md="3" controlId="validationCustom02">
                        <Form.Control
                           required
                           type="text"
                           placeholder={intl.formatMessage({
                              id: "componentUsersTabLastNameLabel",
                              defaultMessage: "Last Name",
                           })}
                           name="lastName"
                           value={userForm.lastName}
                           onChange={handleChange}
                           className="border-top-0 border-left-0 border-right-0 rounded-0"
                           maxLength="50"
                        />
                        {submitted && errors.lastName && (
                           <p className="text-danger form-text-danger">
                              {errors.lastName}
                           </p>
                        )}
                     </Form.Group>

                     <Form.Group as={Col} md="3" controlId="validationEmail">
                        <Form.Control
                           type="email"
                           placeholder={intl.formatMessage({
                              id: "componentUsersTabEmailLabel",
                              defaultMessage: "Email",
                           })}
                           required
                           name="email"
                           value={userForm.email}
                           onChange={handleChange}
                           className="border-top-0 border-left-0 border-right-0 rounded-0"
                           maxLength="50"
                        />
                        {submitted && errors.email && (
                           <p className="text-danger form-text-danger">
                              {errors.email}
                           </p>
                        )}
                        {errorKey === "email" && (
                           <p
                              className="text-danger form-text-danger"
                              onMouseEnter={handleClearMessage}
                           >
                              {errorMessage}
                           </p>
                        )}
                     </Form.Group>

                     <Form.Group
                        as={Col}
                        md="3"
                        controlId="exampleForm.SelectCustom"
                     >
                        <Form.Control
                           placeholder="Select Role"
                           as="select"
                           custom
                           name="role"
                           value={userForm.role}
                           onChange={handleChange}
                           className="border-top-0 border-left-0 border-right-0 rounded-0"
                        >
                           {userForm.role === "Select Role" && (
                              <option>Select Role</option>
                           )}

                           {userTypesState &&
                              userTypesState.map(({ name, id }) => (
                                 <option key={id} value={id}>
                                    {name}
                                 </option>
                              ))}
                        </Form.Control>
                     </Form.Group>
                  </Form.Row>
               </div>
               <div className="my-4 d-flex justify-content-end bottom-btn-grp">
                  <Button onClick={handleCloseForm} className="mr-4 cancel-btn">
                     <FormattedMessage
                        defaultMessage="Cancel"
                        id="componentUsersTabCancelButton"
                     />
                  </Button>
                  <Button type="submit" className="save-btn">
                     {(registering || updatingUser) && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                     )}
                     <FormattedMessage
                        defaultMessage="Save"
                        id="componentUsersTabSaveButton"
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

   const handleChangeUpdate = (id) => (e) => {
      const { checked } = e.target;

      dispatch(userActions.updateUserStatus({ status: checked ? 10 : 30, id }));
      setUpdateStatus({
         ...updateStatus,
         [id]: { id, status: checked ? 10 : 30 },
      });
   };

   const handleSendingInvitation = (id) => () => {
      dispatch(userActions.sendInvitation(id));
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
                           <th
                              scope="col"
                              className="border-0 font-style thead"
                           >
                              <FormattedMessage
                                 defaultMessage="User ID"
                                 id="componentUsersTabTableHeadUserId"
                              />
                           </th>
                           <th
                              scope="col"
                              className="border-0 font-style thead"
                           >
                              <FormattedMessage
                                 defaultMessage="User"
                                 id="componentUsersTabTableHeadUser"
                              />
                           </th>
                           <th
                              scope="col"
                              className="border-0 font-style thead"
                           >
                              <FormattedMessage
                                 defaultMessage="Email"
                                 id="componentUsersTabTableHeadEmail"
                              />
                           </th>
                           <th
                              scope="col"
                              className="border-0 font-style thead"
                           >
                              <FormattedMessage
                                 defaultMessage="Role"
                                 id="componentUsersTabTableHeadRole"
                              />
                           </th>
                           <th
                              scope="col"
                              className="border-0 font-style thead status-color"
                           >
                              <span>
                                 <UpArrowIcon />
                              </span>
                              <FormattedMessage
                                 defaultMessage="Status"
                                 id="componentUsersTabTableHeadStatus"
                              />
                           </th>
                           <th
                              scope="col"
                              className="d-flex align-items-center justify-content-end border-0 font-style create-user pointerType"
                              onClick={handleCloseForm}
                           >
                              <span className="create-user-icon ipad-create-user-icon">
                                 <CreateUserIcon />
                              </span>
                              <b>
                                 <FormattedMessage
                                    defaultMessage="Create User"
                                    id="componentUsersTabTableHeadCreateuser"
                                 />
                              </b>
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
                                 user_type,

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
                                          {allUsersTypes !== {} &&
                                             user_type !== null &&
                                             allUsersTypes[
                                                parseInt(user_type)
                                             ] &&
                                             allUsersTypes[parseInt(user_type)]
                                                .name}
                                       </td>
                                       <td className="border-right-0 border-left-0">
                                          <span className="d-flex justify-content-between">
                                             {updateStatus[id] &&
                                             updateStatus[id].status === 10
                                                ? intl.formatMessage({
                                                     id:
                                                        "componentUsersTabActive",
                                                     defaultMessage: "Active",
                                                  })
                                                : ""}
                                             {updateStatus[id] &&
                                             updateStatus[id].status === 20
                                                ? intl.formatMessage({
                                                     id:
                                                        "componentUsersTabSent",
                                                     defaultMessage: "Sent",
                                                  })
                                                : ""}
                                             {updateStatus[id] &&
                                             updateStatus[id].status === 30
                                                ? intl.formatMessage({
                                                     id:
                                                        "componentUsersTabInActive",
                                                     defaultMessage: "InActive",
                                                  })
                                                : ""}
                                             {updateStatus[id] &&
                                             (updateStatus[id].status === 10 ||
                                                updateStatus[id].status ===
                                                   30) ? (
                                                <Form.Check
                                                   type="switch"
                                                   name={id}
                                                   id={`${id}`}
                                                   checked={
                                                      updateStatus[id]
                                                         .status === 10
                                                         ? true
                                                         : false
                                                   }
                                                   label=""
                                                   onChange={handleChangeUpdate(
                                                      id
                                                   )}
                                                />
                                             ) : (
                                                <button
                                                   className="btn btn-sm resend-btn"
                                                   onClick={handleSendingInvitation(
                                                      id
                                                   )}
                                                >
                                                   Resend
                                                </button>
                                             )}
                                          </span>
                                       </td>

                                       <td className="border-left-0">
                                       <DeleteEditGroup  handleShow={handleShow}
                                            handleEditForm={handleEditForm}
                                            handleShowParam={id}
                                            handleEditFormParam={{
                                             id,
                                             first_name,
                                             last_name,
                                             email,
                                             user_type,
                                            }}/>
                                          
                                       </td>
                                    </tr>
                                 );
                              }
                           )
                        ) : (
                           <tr>
                              <td>
                                 <FormattedMessage
                                    id="componentUsersTabTableNoUser"
                                    defaultMessaeg="No User"
                                 />
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </Table>
                  <Pagination
                     usersPerPage={usersPerPage}
                     totalUsers={usersCount}
                     paginate={paginate}
                     currentPage={currentPage}
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
      if (!deletingUser) {
         handleClose();
      }
   };

   const handleEditForm = (user) => {
      setUserForm({
         ...userForm,
         id: user.id,
         firstName: user.first_name,
         lastName: user.last_name,
         email: user.email,
         role: user.user_type,
         edit: true,
      });
      handleCloseForm();
   };

   return (
      <React.Fragment>
         {closeForm ? createUserForm() : ""}
         {message && (
            <MessageBar
               messageType={messageType}
               message={message}
               handleClearMessage={handleClearMessage}
            />
         )}
         {show ? (
            <DeleteModal
               id={show.id}
               showModal={show.showModal}
               deleting={deletingUser}
               handleClose={handleClose}
               handleDelete={handleDeleteUser}
               message="User will be deleted"
               messageId="componentUsersTabDeleteModalWarning"
            />
         ) : null}
         {userTable()}
      </React.Fragment>
   );
};

export default UsersTab;
