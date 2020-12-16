import React, { useState, useEffect } from 'react';
import { Navbar, Nav, OverlayTrigger, Popover, InputGroup, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { LinkContainer } from 'react-router-bootstrap';

//components
import ListUser from '../../components/ui/list-user/list-user.component';
import UserMessageList from '../../components/Common/user-message-list/user-message-list.component';
//functions
import { mapUserIdToMessageId, addUnreadCount } from '../../helpers/utils';
import { userActions } from '../../redux/user/user.actions';
import messageActions from '../../redux/message/message.actions';

// static
import { ReactComponent as SearchIcon } from '../../assets/img/search-icon.svg';
import { ReactComponent as UserIcon } from '../../assets/img/user-icon.svg';
import { ReactComponent as MessageIcon } from '../../assets/img/message-icon.svg';
import { ReactComponent as NotificationIcon } from '../../assets/img/notification-icon.svg';
import { ReactComponent as BackIcon } from '../../assets/img/back-icon.svg';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import './dashboard.styles.css';
import { setQuestionType } from '../../redux/local/local.actions';
import { questionFormStateEditFalse,resetAnswerState } from '../../redux/questionFormState/questionFormState.action';

const Dashboard = () => {
	const intl = useIntl();
	const [list, setList] = useState(true);
	const [showMessagePopover, setShowMessagePopover] = useState(false);
	const [userData, setUserData] = useState({});
	const [searchUser, setSearchUser] = useState('');
	const [messageId, setMessageId] = useState();
	const [unreadCount, setUnreadCount] = useState(0);
	const dispatch = useDispatch();
	const history = useHistory();

	const userTypeCreating = useSelector((state) => state.userTypes.userTypeCreating);
	const updatingUserType = useSelector((state) => state.userTypes.updatingUserType);
	let users = useSelector((state) => state.message.userList);
	const message_id_list = useSelector((state) => state.message.messagesIdList);
	const questionType = useSelector((state) => state.local.questions);

	const localUser =
		localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : undefined;
	const localUserObj = localUser && localUser.userObj;
	const isReview = localUser && localUser.userObj.reviewQuestions;
	let rootUrl;
	if (isReview) {
		rootUrl = '/my-reviews';
	} else if (localUserObj && localUserObj.role === 'Admin') {
		rootUrl = '/admin/dashboard';
	} else {
		rootUrl = '/my-questions';
	}

	useEffect(() => {
		dispatch(messageActions.get_message_user_list());
	}, []);

	useEffect(() => {
		if (questionType) {
			history.push('/create-question');
		}
	}, [questionType]);

	useEffect(() => {
		if (!localUser) {
			history.push('/');
		}
	}, [localUser]);

	useEffect(() => {
		if (localUser && localUser.userObj.role === 'Admin') {
			if (!updatingUserType && !userTypeCreating) {
				dispatch(userActions.getAllUserTypes());
			}
		}
	}, [updatingUserType, userTypeCreating]);

	useEffect(() => {
		if (list) dispatch(messageActions.get_messages_id());
	}, [list]);

	useEffect(() => {
		setUnreadCount(addUnreadCount(users, message_id_list));
	}, [users, message_id_list]);

	const handleLogout = () => {
		dispatch(userActions.logout());
	};

	users = users.filter((user) => user.fullname && user.fullname.toLowerCase().includes(searchUser.toLowerCase()));
	users = users.filter((user) => user.id !== localUser.userObj.id);

	const handleUserMessages = (userDataObj) => () => {
		setUserData(userDataObj);
		setMessageId(mapUserIdToMessageId(userDataObj.userId, message_id_list));
		setList(!list);
	};

	const setMessageIdProp = (value) => {
		setMessageId(value);
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
								id: 'componentDashboardSearchUser',
								defaultMessage: 'Search',
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

			<div>
				{list ? (
					<div className="list">
						{users.map((user) => (
							<div
								key={user.id}
								onClick={handleUserMessages({
									userId: user.id,
									name: user.fullname,
								})}
							>
								<ListUser user={user} />
							</div>
						))}
					</div>
				) : (
					<UserMessageList userId={userData.userId} messageId={messageId} setMessageIdProp={setMessageIdProp} />
				)}
			</div>
		</Popover>
	);
	//</Nav.Link>//<Nav.Link className="py-0 user-manag font-style">

	const navbar = () => {
		return (
			<Navbar expand="lg" className="px-4 py-0 px-md-0 py-md-0 nav-border border-0 mb-4 mob-padding">
				<LinkContainer to={`${rootUrl}`}>
					<Navbar.Brand className="brand-logo" onClick={() => dispatch(setQuestionType(false))}>
						<Logo />
					</Navbar.Brand>
				</LinkContainer>

				<Nav className="flex-grow-1 d-flex align-items-center">
					<span className="py-0 user-manag font-style">
						{localUser && localUser.userObj && localUser.userObj.role === 'Admin' ? (
							<FormattedMessage defaultMessage="Users Management" id="pageUsersManagementHeader" />
						) : (
							<FormattedMessage defaultMessage="Questions Management" id="pageQuestionsHeader" />
						)}
					</span>

					<div className="admin-links-container">
						{localUserObj && localUserObj.role === 'Admin' && !questionType && (
							<>
								<LinkContainer to="/admin/dashboard">
									<Nav.Link>Dashboard</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/admin/users">
									<Nav.Link>Users</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/admin/user-types">
									<Nav.Link>UserTypes</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/admin/settings">
									<Nav.Link>Settings</Nav.Link>
								</LinkContainer>
							</>
						)}
						{localUserObj && localUserObj.createQuestions && !questionType && (
							<>
								<LinkContainer to="/my-questions">
									<Nav.Link>My Questions</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/all-questions">
									<Nav.Link>All Questions</Nav.Link>
								</LinkContainer>
							</>
						)}
						{localUserObj && localUserObj.reviewQuestions && !questionType && (
							<>
								<LinkContainer to="/my-reviews">
									<Nav.Link>My Reviews</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/all-reviews">
									<Nav.Link>All Reviews</Nav.Link>
								</LinkContainer>
							</>
						)}
						{questionType !== false && !isReview && window.location.hash === '#/create-question' && (
							<LinkContainer to="/my-questions" onClick={() => {
								dispatch(setQuestionType(false))
								dispatch(questionFormStateEditFalse());
								dispatch(resetAnswerState())
							}
							}>
								<Nav.Link> My Questions</Nav.Link>
							</LinkContainer>
						)}
						{questionType !== false && isReview && window.location.hash === '#/create-question' && (
							<LinkContainer to="/my-reviews" onClick={() => dispatch(setQuestionType(false))}>
								<Nav.Link>Review</Nav.Link>
							</LinkContainer>
						)}
					</div>
					<div className="d-flex justify-content-around pr-1 align-top pr-md-2">
						<OverlayTrigger show={showMessagePopover} placement="bottom" overlay={CustomPopover}>
							<div
								className={`pr-2 cursor-pointer pr-md-2 pr-lg-3 ${
									showMessagePopover || unreadCount > 0 ? 'popup-active' : ''
								}`}
								onClick={() => setShowMessagePopover(!showMessagePopover)}
							>
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
					{localUserObj && localUserObj.first_name + ' ' + localUserObj.last_name}
					<span className="logout pl-0 pl-lg-2 pl-md-2 pointerType" onClick={handleLogout}>
						<FormattedMessage defaultMessage="Logout" id="pageUsersLogout" />
					</span>
				</div>
			</Navbar>
		);
	};

	return <React.Fragment>{navbar()}</React.Fragment>;
};

export default Dashboard;
