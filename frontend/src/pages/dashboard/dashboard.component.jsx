import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Navbar,
  Nav,
  OverlayTrigger,
  Popover,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

import "./dashboard.styles.css";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import ListUser from "../../components/list-user/list-user.component";
import UserMessageList from "../../components/user-message-list/user-message-list.component";
import { userActions } from "../../redux/user/user.actions";
import messageActions from "../../redux/message/message.actions";
// import CustomPopover from "../../components/custom-popover/custom-popover.component";
import AdminDashboard from "../../components/admin-dashboard/adminDashboard.component";
import UsersTab from "../../components/users-tab/users-tab.component";
import UserTypes from "../../components/user-types/user-types.component";
import Settings from "../../components/settings/settings.component";
import MyQuestions from "../../components/my-questions/my-questions.component";
import AllQuestions from "../../components/all-questions/all-questions.component";

const Dashboard = () => {
  const intl = useIntl();
  const [keyUsersManagement, setKeyUsersManagement] = useState("dashboard");
  const [keyQuestionsManagement, setKeyQuestionsManagement] = useState(
    "my-questions"
  );
  const [list, setList] = useState(true);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const userTypeCreating = useSelector(
    (state) => state.userTypes.userTypeCreating
  );
  const updatingUserType = useSelector(
    (state) => state.userTypes.updatingUserType
  );

  const localUser =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;

  useEffect(() => {
    if (!localUser) {
      history.push("/");
    }
  }, [localUser]);

  useEffect(() => {
    if (!updatingUserType && !userTypeCreating) {
      dispatch(userActions.getAllUserTypes());
    }
  }, [updatingUserType, userTypeCreating]);

  useEffect(() => {
    dispatch(messageActions.get_message_user_list());
  }, []);

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  let users = useSelector((state) => state.message.userList);
  if (users.length === 0) {
    users = [
      {
        id: 83,
        email: "rajparmar7879+1@gmail.com",
        first_name: "Raj",
        last_name: "Parmar",
        user_type: null,
        accepted_terms_date: null,
        role: "Admin",
        status: 10,
      },
      {
        id: 98,
        email: "jcghvbjnk@iuyhvjh.com",
        first_name: "rem0",
        last_name: "nbdvb",
        user_type: 84,
        accepted_terms_date: null,
        role: "Editor",
        status: 20,
      },
      {
        id: 32,
        email: "david.robson@spiralmath.net",
        first_name: "david",
        last_name: "robson",
        user_type: null,
        accepted_terms_date: null,
        role: "Admin",
        status: 10,
      },
    ];
  }

  const handleUserMessages = (userDataObj) => () => {
    setUserData(userDataObj);
    setList(!list);
  };

  const backToUserList = () => {
    setList(!list);
  };

  const CustomPopover = (
    <Popover id="popover-positioned-bottom">
      <Popover.Title>
        {list ? (
          <InputGroup className="mb-3 input-icon">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <svg
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7719 3.52298C10.7719 5.18436 9.42508 6.53118 7.7637 6.53118C6.10233 6.53118 4.75551 5.18436 4.75551 3.52298C4.75551 1.8616 6.10233 0.514789 7.7637 0.514789C9.42508 0.514789 10.7719 1.8616 10.7719 3.52298Z"
                    fill="#858585"
                    stroke="#858585"
                    strokeWidth="0.931921"
                  />
                  <path
                    d="M1.28139 12.2092C1.28139 11.7925 1.49211 11.3907 1.92595 11.0024C2.36245 10.6116 2.98931 10.2693 3.71906 9.98986C4.93764 9.52319 6.35755 9.26355 7.44489 9.21397C7.2442 10.1077 7.08983 11.8011 8.16252 13.4803H1.68397C1.46361 13.4803 1.28139 13.2981 1.28139 13.0777V12.2092Z"
                    fill="#858585"
                    stroke="#858585"
                    strokeWidth="0.931921"
                  />
                  <path
                    d="M16.7049 12.287C17.2085 11.4299 17.4549 10.3906 17.2192 9.26561C16.8549 7.50847 15.3764 6.10491 13.5978 5.87991C10.7799 5.51562 8.40137 7.88347 8.77637 10.7013C9.01208 12.4799 10.4049 13.9585 12.1621 14.3227C13.2871 14.5585 14.3264 14.312 15.1835 13.8085L17.1763 15.8013C17.3767 16.0016 17.6484 16.1142 17.9317 16.1142C18.215 16.1142 18.4867 16.0016 18.6871 15.8013C18.8874 15.601 18.9999 15.3293 18.9999 15.046C18.9999 14.7626 18.8874 14.4909 18.6871 14.2906L16.7049 12.287ZM13.0299 12.2656C11.8514 12.2656 10.8871 11.3013 10.8871 10.1228C10.8871 8.94419 11.8514 7.9799 13.0299 7.9799C14.2085 7.9799 15.1728 8.94419 15.1728 10.1228C15.1728 11.3013 14.2085 12.2656 13.0299 12.2656Z"
                    fill="#858585"
                    stroke="white"
                    strokeWidth="0.919691"
                  />
                </svg>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        ) : (
          <h4>
            <span className="pointerType pointer-type" onClick={backToUserList}>
              <svg
                width="10"
                height="17"
                viewBox="0 0 10 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.1706 1.28718C9.07764 1.19398 8.9672 1.12004 8.84562 1.06959C8.72403 1.01913 8.59369 0.993164 8.46205 0.993164C8.33041 0.993164 8.20007 1.01913 8.07849 1.06959C7.9569 1.12004 7.84647 1.19398 7.7535 1.28718L1.10035 7.94033C1.02613 8.0144 0.967244 8.10238 0.927067 8.19923C0.886891 8.29609 0.866211 8.39991 0.866211 8.50477C0.866211 8.60962 0.886891 8.71345 0.927067 8.8103C0.967244 8.90716 1.02613 8.99514 1.10035 9.06921L7.7535 15.7224C8.14581 16.1147 8.7783 16.1147 9.1706 15.7224C9.5629 15.3301 9.5629 14.6976 9.1706 14.3053L3.37411 8.50077L9.17861 2.69627C9.5629 2.31197 9.5629 1.67148 9.1706 1.28718Z"
                  fill="#858585"
                />
              </svg>
            </span>
            {userData.name}
          </h4>
        )}
      </Popover.Title>

      <div className="list">
        {list ? (
          users.map((user) => (
            <div
              key={user.id}
              onClick={handleUserMessages({
                userId: user.id,
                name: user.full_name,
              })}
            >
              <ListUser user={user} />
            </div>
          ))
        ) : (
          <UserMessageList userId={userData.userId} messageId={2} />
        )}
      </div>

      <Popover.Content></Popover.Content>
    </Popover>
  );

  const navbar = () => {
    return (
      <Navbar
        expand="lg"
        className="px-4 py-0 px-md-0 py-md-0 nav-border border-0 mb-4 mob-padding"
      >
        <Navbar.Brand href="#">
          <Logo />
        </Navbar.Brand>

        <Nav className="flex-grow-1 d-flex align-items-center">
          <Nav.Link href="#" className="py-0 user-manag font-style">
            {localUser &&
            localUser.userObj &&
            localUser.userObj.role === "Admin" ? (
              <FormattedMessage
                defaultMessage="Users Management"
                id="pageUsersManagementHeader"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Questions Management"
                id="pageQuestionsHeader"
              />
            )}
          </Nav.Link>
          <Nav.Link href="#">
            <pre> </pre>
          </Nav.Link>

          {localUser &&
          localUser.userObj &&
          localUser.userObj.role === "Admin" ? (
            <Tabs
              id="controlled-tab"
              className="mr-auto navbar-style justify-content-around flex-grow-1 border-bottom-0"
              activeKey={keyUsersManagement}
              onSelect={(k) => setKeyUsersManagement(k)}
            >
              <Tab
                className="py-0 border-0"
                eventKey="dashboard"
                title={intl.formatMessage({
                  id: "pageUsersDashboardTab",
                  defaultMessage: "Dashboard",
                })}
              ></Tab>
              <Tab
                className="py-0 border-0"
                eventKey="users"
                title={intl.formatMessage({
                  id: "pageUsersUsersTab",
                  defaultMessage: "Users",
                })}
              ></Tab>
              <Tab
                className="py-0 border-0"
                eventKey="user-types"
                title={intl.formatMessage({
                  id: "pageUsersUserTypesTab",
                  defaultMessage: "User Types",
                })}
              ></Tab>
              <Tab
                className="py-0 border-0"
                eventKey="settings"
                title={intl.formatMessage({
                  id: "pageUsersSettingsTab",
                  defaultMessage: "Settings",
                })}
              ></Tab>
            </Tabs>
          ) : (
            <Tabs
              id="controlled-tab"
              className="mr-auto navbar-style justify-content-center flex-grow-1 border-bottom-0"
              activeKey={keyQuestionsManagement}
              onSelect={(k) => setKeyQuestionsManagement(k)}
            >
              <Tab
                className="py-0 border-0 mr-5"
                eventKey="my-questions"
                title={intl.formatMessage({
                  id: "pageQuestionsMyQuestionsTab",
                  defaultMessage: "My Questions",
                })}
              ></Tab>
              <Tab
                className="py-0 border-0 ml-5"
                eventKey="all-questions"
                title={intl.formatMessage({
                  id: "pageQuestionsAllQuestionsTab",
                  defaultMessage: "All Questions",
                })}
              ></Tab>
            </Tabs>
          )}

          <div className="d-flex justify-content-around pr-1 align-top pr-md-2">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={CustomPopover}
            >
              <div className="pr-2 cursor-pointer pr-md-2 pr-lg-3 popup-active">
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
                    strokeWidth="0.254545"
                  />
                </svg>
              </div>
            </OverlayTrigger>
            <div className="pr-2 notification-icon cursor-pointer pr-md-2 pr-lg-3">
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
        <div className="user-name">
          <span className="user-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.75 13C7.75 12.31 8.31 11.75 9 11.75C9.69 11.75 10.25 12.31 10.25 13C10.25 13.69 9.69 14.25 9 14.25C8.31 14.25 7.75 13.69 7.75 13ZM13.75 13C13.75 12.31 14.31 11.75 15 11.75C15.69 11.75 16.25 12.31 16.25 13C16.25 13.69 15.69 14.25 15 14.25C14.31 14.25 13.75 13.69 13.75 13ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 11.21 19.88 10.45 19.67 9.74C18.95 9.91 18.2 10 17.42 10C14.05 10 11.07 8.33 9.26 5.77C8.28 8.16 6.41 10.09 4.05 11.14C4.02 11.42 4 11.71 4 12Z"
                  fill="black"
                />
              </g>
            </svg>
          </span>
          {localUser.userObj.first_name + " " + localUser.userObj.last_name}
          <span
            className="logout pl-0 pl-lg-2 pl-md-2 pointerType"
            onClick={handleLogout}
          >
            <FormattedMessage defaultMessage="Logout" id="pageUsersLogout" />
          </span>
        </div>
      </Navbar>
    );
  };

  return (
    <React.Fragment>
      {navbar()}
      {localUser &&
      localUser.userObj &&
      localUser.userObj.role === "Admin" &&
      keyUsersManagement === "dashboard" ? (
        <AdminDashboard />
      ) : (
        ""
      )}
      {keyUsersManagement === "users" ? <UsersTab /> : ""}
      {keyUsersManagement === "user-types" ? <UserTypes /> : ""}
      {keyUsersManagement === "settings" ? <Settings /> : ""}
      {localUser &&
      localUser.userObj &&
      localUser.userObj.role === "Editor" &&
      keyQuestionsManagement === "my-questions" ? (
        <MyQuestions />
      ) : (
        ""
      )}
      {keyQuestionsManagement === "all-questions" ? <AllQuestions /> : ""}
    </React.Fragment>
  );
};

export default Dashboard;
