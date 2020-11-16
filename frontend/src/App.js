import React, { useEffect } from 'react';
import katex from 'katex';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { RawIntlProvider } from 'react-intl';
import { generateIntl } from './helpers/intl';
import { useSelector } from 'react-redux';

import en from './translations/en';
import hindi from './translations/hindi';

import PrivateRoute from './components/Common/private-route/private-route.component';
import AdminRoute from './components/Common/admin-route/admin-route.component.jsx';
import AdminInfo from './components/Admin/admin-info/admin-info.component';
import Users from './components/Admin/users-tab/users-tab.component.jsx';
import UserTypes from './components/Admin/user-types/user-types.component.jsx';
import Settings from './components/Admin/settings/settings.component.jsx';
import SignUp from './pages/signup/signup.component';
import ConfirmEmail from './pages/confirm-email/confirm-email.component';
import Login from './pages/login/login.component';
import ForgotPassword from './pages/forgot-password/forgot-password.component';
import MyQuestions from './components/Author/my-questions/my-questions.component.jsx';
import AllQuestions from './components/Author/all-questions/all-questions.component.jsx';
import CreateQuestion from './components/Author/question/question.component.jsx';
import ReviewQuestion from './components/Author/question/question.component.jsx';
import MyReviews from './components/Reviewer/my-reviews/my-reviews.component.jsx';
import AllReviews from './components/Reviewer/all-questions-review/all-questions-reviews.compnent.jsx';
import Footer from './components/Common/footer/footer.component';

import '../node_modules/react-quill/dist/quill.snow.css';
import './App.css';

const messages = { en, hindi };
const intlValue = generateIntl({ locale: 'en', messages: messages['en'] });

function App() {
	const history = useHistory();
	const questionType = useSelector((state) => state.local.questions);
	useEffect(() => {
		window.katex = katex;
		history.push('/login');
	}, []);
	return (
		<RawIntlProvider value={intlValue}>
			<Container>
				<Switch>
					<Route path="/login" exact component={Login} />
					<AdminRoute path="/admin/dashboard" exact component={AdminInfo} />
					<AdminRoute path="/admin/users" exact component={Users} />
					<AdminRoute path="/admin/user-types" exact component={UserTypes} />
					<AdminRoute path="/admin/settings" exact component={Settings} />
					<PrivateRoute path="/my-questions" exact component={MyQuestions} />
					<PrivateRoute path="/all-questions" exact component={AllQuestions} />
					<PrivateRoute path="/create-question" exact component={CreateQuestion} questionType={questionType} />
					<PrivateRoute path="/review-question" exact component={ReviewQuestion} />
					<PrivateRoute path="/my-reviews" exact component={MyReviews} />
					<PrivateRoute path="/all-reviews" exact component={AllReviews} />
					<Route path="/register" exact component={SignUp} />
					<Route path="/reset-password" exact component={SignUp} />
					<Route path="/forgot-password" exact component={ForgotPassword} />
					<Route path="/confirm-email" exact component={ConfirmEmail} />
				</Switch>
				<Footer />
			</Container>
		</RawIntlProvider>
	);
}

export default App;
