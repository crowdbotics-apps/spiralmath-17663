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
import ListUser from "../../components/list-user/list-user.component";
import UserMessageList from "../../components/user-message-list/user-message-list.component";
import { userActions } from "../../redux/user/user.actions";
import messageActions from "../../redux/message/message.actions";
import AdminDashboard from "../../components/admin-dashboard/adminDashboard.component";
import UsersTab from "../../components/users-tab/users-tab.component";
import UserTypes from "../../components/user-types/user-types.component";
import Settings from "../../components/settings/settings.component";
import MyQuestions from "../../components/my-questions/my-questions.component";
import AllQuestions from "../../components/all-questions/all-questions.component";
import { ReactComponent as SearchIcon } from "../../assets/img/search-icon.svg";
import { ReactComponent as UserIcon } from "../../assets/img/user-icon.svg";
import { ReactComponent as MessageIcon } from "../../assets/img/message-icon.svg";
import { ReactComponent as NotificationIcon } from "../../assets/img/notification-icon.svg";
import { ReactComponent as BackIcon } from "../../assets/img/back-icon.svg";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";

const mapUserIdToMessageId = (id, list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].users[1] === id) {
      return list[i].id;
    }
  }
  return false;
};

const Dashboard = () => {
  const intl = useIntl();
  const [keyUsersManagement, setKeyUsersManagement] = useState("dashboard");
  const [keyQuestionsManagement, setKeyQuestionsManagement] = useState(
    "my-questions"
  );
  const [list, setList] = useState(true);
  const [userData, setUserData] = useState({});
  const [searchUser, setSearchUser] = useState("");
  const [messageId, setMessageId] = useState();
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

  useEffect(() => {
    dispatch(messageActions.get_messages_id());
  }, []);

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  let users = useSelector((state) => state.message.userList);
  const message_id_list = useSelector((state) => state.message.messagesIdList);

  if (users.length === 0) {
    users = [
      {
        id: 83,
        email: "rajparmar7879+1@gmail.com",
        first_name: "Raj",
        last_name: "Parmar",
        fullname: "Raj Parmar",
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
        fullname: "Yogesh Vishnole",
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
        fullname: "poornesh",
        user_type: null,
        accepted_terms_date: null,
        role: "Admin",
        status: 10,
      },
    ];
  }

  users = users.filter(
    (user) =>
      user.fullname &&
      user.fullname.toLowerCase().includes(searchUser.toLowerCase())
  );

  const handleUserMessages = (userDataObj) => () => {
    setUserData(userDataObj);
    setMessageId(mapUserIdToMessageId(userDataObj.userId, message_id_list));
    setList(!list);
  };

  const backToUserList = () => {
    setList(!list);
  };

  const onSearchUserChange = (e) => {
    setSearchUser(e.target.value);
  };

  const CustomPopover = (
    <Popover id="popover-positioned-bottom">
      <Popover.Title>
        {list ? (
          <InputGroup className="mb-3 input-icon">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <SearchIcon />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={intl.formatMessage({
                id: "componentDashboardSearchUser",
                defaultMessage: "Search",
              })}
              aria-label="search-user"
              aria-describedby="basic-addon1"
              value={searchUser}
              onChange={onSearchUserChange}
            />
          </InputGroup>
        ) : (
          <h4>
            <span className="pointerType pointer-type" onClick={backToUserList}>
              <BackIcon />
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
                name: user.fullname,
              })}
            >
              <ListUser user={user} />
            </div>
          ))
        ) : (
          <UserMessageList userId={userData.userId} messageId={messageId} />
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
                <MessageIcon />
              </div>
            </OverlayTrigger>
            <div className="pr-2 notification-icon cursor-pointer pr-md-2 pr-lg-3">
              <NotificationIcon />
            </div>
          </div>
        </Nav>
        <div className="user-name">
          <span className="user-icon">
            <UserIcon />
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
