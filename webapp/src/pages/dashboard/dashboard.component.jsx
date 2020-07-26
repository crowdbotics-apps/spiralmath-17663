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

import "./dashboard.styles.css";
import { userActions } from "../../redux/user/user.actions";
import validateCreateUser from "../../helpers/validation/validateCreateUser";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

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
              fill-rule="evenodd"
              clip-rule="evenodd"
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.2753 4.56006C17.5912 4.87596 17.5912 5.38626 17.2753 5.70216L15.793 7.18446L12.7555 4.14696L14.2378 2.66466C14.5537 2.34876 15.064 2.34876 15.3799 2.66466L17.2753 4.56006ZM2.93018 17.0098V13.9723L11.8888 5.01366L14.9263 8.05116L5.96768 17.0098H2.93018Z"
              fill="#494949"
            />
          </g>
        </svg>
      </div>
    </div>
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
      <Navbar expand="lg" className="px-4 py-0 nav-border border-0 mb-4">
        <Navbar.Brand href="#home">
          <Logo />
        </Navbar.Brand>

        <Nav className="flex-grow-1 d-flex align-items-center">
          <Nav.Link href="#home" className="py-0 user-manag font-style">
            Users Management
          </Nav.Link>
          <Nav.Link href="#home">
            <pre> </pre>
          </Nav.Link>
          <Tabs
            id="controlled-tab"
            className="mr-auto navbar-style justify-content-around flex-grow-1 border-bottom-0"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab
              className="py-0 border-0"
              eventKey="dashboard"
              title="Home"
            ></Tab>
            <Tab className="py-0 border-0" eventKey="users" title="Users"></Tab>
            <Tab
              className="py-0 border-0"
              eventKey="user-types"
              title="User Types"
            ></Tab>
            <Tab
              className="py-0 border-0"
              eventKey="settings"
              title="Settings"
            ></Tab>
          </Tabs>

          <div className="d-flex justify-content-around pr-5">
            <div className="pr-4">
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.659 2.00118L16.0353 1.76599H15.5916H2.01582H1.57204L1.94836 2.00118L8.73624 6.24361L8.80369 6.28577L8.87115 6.24361L15.659 2.00118ZM15.5916 12.2023H15.7188V12.0751V3.59023V3.36059L15.5241 3.4823L8.80369 7.68256L2.08327 3.4823L1.88854 3.36059V3.59023V12.0751V12.2023H2.01582H15.5916ZM15.5916 0.323562C16.4546 0.323562 17.1613 1.03022 17.1613 1.89326V12.0751C17.1613 12.9381 16.4546 13.6448 15.5916 13.6448H2.01582C1.15277 13.6448 0.44612 12.9381 0.44612 12.0751V1.89326C0.44612 1.03022 1.15277 0.323562 2.01582 0.323562H15.5916Z"
                  fill="#858585"
                  stroke="white"
                  stroke-width="0.254545"
                />
              </svg>
            </div>

            <div className="pr-2 notification-icon">
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.4422 14.6351C15.9352 14.1831 15.4914 13.6651 15.1226 13.0948C14.7201 12.3076 14.4788 11.4479 14.413 10.5662V7.9692C14.2076 3.6792 11.2338 3.1387 11.1799 2.82787C11.2655 3.32203 13.5174 6.79637 13.1513 6.58662C13.2908 7.03601 13.3617 7.5039 13.3616 7.97446V10.5714C13.426 11.647 13.7219 12.696 14.229 13.6467C14.5919 14.2219 15.0226 14.7513 15.5117 15.2238H2.04853C2.53764 14.7513 2.96829 14.2219 3.33123 13.6467C3.83833 12.696 4.1342 11.647 4.19864 10.5714V7.9692C4.19587 7.36081 4.31314 6.75784 4.54373 6.19482C4.77432 5.63181 5.1137 5.11981 5.54244 4.68814C5.97117 4.25647 6.48085 3.91361 7.04228 3.6792C7.60371 3.44478 8.20587 3.32341 8.81427 3.32203C9.70468 3.32274 10.5751 3.58606 11.3166 4.07904C12.0383 4.86445 13.0465 5.91168 13.0375 5.6007L11.1799 2.82787C10.631 2.55785 10.0413 2.38024 9.43459 2.30218V1.6398C9.43459 1.45366 9.36065 1.27516 9.22904 1.14354C9.09742 1.01193 8.91892 0.937988 8.73278 0.937988C8.54665 0.937988 8.36815 1.01193 8.23653 1.14354C8.10492 1.27516 8.03098 1.45366 8.03098 1.6398V2.32846C6.67242 2.52011 5.42907 3.19678 4.53047 4.23356C3.63186 5.27033 3.13869 6.5972 3.14198 7.9692V10.5662C3.07614 11.4479 2.83486 12.3076 2.43229 13.0948C2.07002 13.6638 1.63333 14.1818 1.13382 14.6351C1.07774 14.6843 1.0328 14.745 1.00198 14.8129C0.971161 14.8809 0.955173 14.9547 0.955078 15.0293V15.7443C0.955078 15.8837 1.01046 16.0174 1.10905 16.116C1.20764 16.2146 1.34135 16.27 1.48078 16.27H16.0952C16.2346 16.27 16.3683 16.2146 16.4669 16.116C16.5655 16.0174 16.6209 15.8837 16.6209 15.7443V15.0293C16.6208 14.9547 16.6048 14.8809 16.574 14.8129C16.5432 14.745 16.4982 14.6843 16.4422 14.6351Z"
                  fill="#858585"
                />
              </svg>
            </div>
          </div>
        </Nav>
        <div className="">User</div>
      </Navbar>
    );
  };

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
    console.log(value);
    setUserForm((userForm) => ({ ...userForm, [name]: value }));
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

  const [closeForm, setCloseForm] = useState(true);

  const handleCloseForm = () => {
    setCloseForm(!closeForm);
  };

  const createUserForm = () => {
    return (
      <Form>
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
              {submitted && !userForm.passwordConfirm && (
                <div className="invalid-feedback">firstName is required</div>
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
          <Button
            type="submit"
            onClick={handleSubmit}
            className="mr-4 cancel-btn"
          >
            {registering && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Cancel
          </Button>
          <Button onClick={handleCloseForm} className="save-btn">
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
          <div class="">
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
                          fill-rule="evenodd"
                          clip-rule="evenodd"
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
                {usersListArrayPreview
                  ? usersListArrayPreview.map(
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
                                <Form.Check
                                  type="switch"
                                  id={`${id}`}
                                  label=""
                                />
                              </span>
                            </td>

                            <td className="border-left-0">{buttons()}</td>
                          </tr>
                        );
                      }
                    )
                  : ""}
              </tbody>
            </Table>
          </div>
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
