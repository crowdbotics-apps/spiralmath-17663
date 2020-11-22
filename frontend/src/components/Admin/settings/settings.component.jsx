import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';

import ReactQuill from 'react-quill';

import settingActions from '../../../redux/setting/setting.actions';
import MessageBar from '../../ui/message-bar/message-bar.component';
import Layout from '../../ui/layout/layout.component.jsx';
import { emailsValidation } from '../../../helpers/validation/settingsValidation';
import { creatorValidation } from '../../../helpers/validation/settingsValidation';
import { selectCreatingCreator } from '../../../redux/setting/setting.select';
import { ReactComponent as EditIcon } from '../../../assets/img/edit-icon.svg';
import './settings.styles.css';

const Settings = () => {
	const dispatch = useDispatch();
	const intl = useIntl();

	const inputRef = useRef(null);
	const editorRef = useRef(null);
	const emailsRef = useRef(null);

	const uploadingFile = useSelector((state) => state.mainSettings.uploadingFile);
	const uploadingNon = useSelector((state) => state.mainSettings.uploadingNon);
	const uploadingR = useSelector((state) => state.mainSettings.uploadingR);
	const uploadingTerms = useSelector((state) => state.mainSettings.uploadingTerms);
	const settings = useSelector((state) => state.mainSettings.settings);
	const creatingCreator = useSelector(selectCreatingCreator);

	const [errors, setErrors] = useState({});
	const [error, setError] = useState('');
	const [creatorError, setCreatorError] = useState({});
	const [emailsEditMode, setEmailsEditMode] = useState(false);
	const [termsEditMode, setTermsEditMode] = useState(false);
	const [file, setFile] = useState('');
	const [terms, setTerms] = useState('');
	const [emails, setEmails] = useState({
		registered: '',
		non_registered: '',
	});
	const [creatorState, setCreatorState] = useState({
		first_name: '',
		last_name: '',
	});

	useEffect(() => {
		let dispSet = {};

		if (settings.length > 0) {
			settings.map((el) => {
				if (el.path === 'terms-condition' || el.path === 'non-registered-email' || el.path === 'registered-email') {
					dispSet[el.path] = el.value;
				}
			});

			setTerms(dispSet['terms-condition']);
			setEmails({
				non_registered: dispSet['non-registered-email'],
				registered: dispSet['registered-email'],
			});
		}
	}, [settings]);

	useEffect(() => {
		if (!uploadingTerms || !uploadingNon || !uploadingR) {
			dispatch(settingActions.get_settings());
		}
	}, [uploadingNon, uploadingR, uploadingTerms]);

	useEffect(() => {
		if (emailsEditMode) {
			emailsRef.current.focus();
		}
	}, [emailsEditMode]);
	useEffect(() => {
		if (termsEditMode) {
			editorRef.current.focus();
		}
	}, [termsEditMode]);

	useEffect(() => {
		if (file) {
			let formData = new FormData();
			formData.append('file', file);
			dispatch(settingActions.upload_file(formData));
			setFile('');
		}
	}, [file]);

	useEffect(() => {
		if (Object.keys(errors).length === 0) {
			if (emails.non_registered && emails.registered) {
				dispatch(settingActions.upload_non_registered(emails));
				dispatch(settingActions.upload_registered(emails));
			}
			setEmails({ non_registered: '', registered: '' });
		}
	}, [errors]);

	useEffect(() => {
		if (Object.keys(creatorError).length === 0) {
			if (creatorState.first_name && creatorState.last_name) dispatch(settingActions.createCreator(creatorState));
			setCreatorState({ first_name: '', last_name: '' });
		}
	}, [creatorError]);

	const handleEmailsEditMode = () => {
		setEmailsEditMode(!emailsEditMode);
	};

	const handleTermsEditMode = () => {
		setTermsEditMode(!termsEditMode);
	};

	const handleTermsChange = (e) => {
		setTerms(e);
		setError('');
	};

	const handleEmailChange = (name) => (e) => {
		const { value } = e.target;
		setEmails({ ...emails, [name]: value });
		setErrors({ ...errors, [name]: '' });
	};

	const emailsSubmit = (e) => {
		e.preventDefault();
		setErrors(emailsValidation(emails));
	};

	const handleCreatorChange = (name) => (e) => {
		const { value } = e.target;
		setCreatorState({ ...creatorState, [name]: value });
		setCreatorError({ ...errors, [name]: '' });
	};

	const submitCreators = (e) => {
		e.preventDefault();
		setCreatorError(creatorValidation(creatorState));
	};

	const handleClearMessage = () => {
		dispatch(settingActions.settingStatusChanger());
	};

	const renderContactUsEmailForm = () => {
		return (
			<Form noValidate onSubmit={emailsSubmit}>
				<div className="px-4 py-4 border form-border border-color position-relative ">
					<Form.Row>
						<Form.Group as={Col} md="2" className="align-self">
							<h5 className="contact-us-email-text">
								<FormattedMessage defaultMessage="Contact Us Email" id="componentSettingsContact" />
							</h5>
						</Form.Group>

						<Form.Group as={Col} md="3" controlId="validationSetting1Email">
							<Form.Label className="label-color">
								<FormattedMessage defaultMessage=" Non Registered Users" id="componentSettingsNonRegUser" />
							</Form.Label>
							<Form.Control
								type="email"
								value={emails.non_registered}
								ref={emailsRef}
								onChange={handleEmailChange('non_registered')}
								required
								className="setting-input-style border-top-0 border-left-0 border-right-0 rounded-0"
								maxLength="50"
								readOnly={!emailsEditMode}
							/>
							{errors.non_registered && <div className="text-danger">{errors.non_registered}</div>}
						</Form.Group>
						<Form.Group as={Col} md="3" controlId="validationSetting2Email">
							<Form.Label className="label-color">
								<FormattedMessage defaultMessage="Registered Users" id="componentSettingsRegUser" />
							</Form.Label>
							<Form.Control
								type="email"
								value={emails.registered}
								onChange={handleEmailChange('registered')}
								className="setting-input-style border-top-0 border-left-0 border-right-0 rounded-0"
								maxLength="50"
								readOnly={!emailsEditMode}
							/>
							{errors.registered && <div className="text-danger">{errors.registered}</div>}
						</Form.Group>
						<div className="emails-edit-icon" onClick={handleEmailsEditMode}>
							<EditIcon />
						</div>
					</Form.Row>
				</div>
				<div className="my-4 d-flex justify-content-end bottom-btn-grp">
					{emailsEditMode ? (
						<React.Fragment>
							<Button className="mr-4 cancel-btn" onClick={() => setEmailsEditMode(!emailsEditMode)}>
								<FormattedMessage defaultMessage="Cancel" id="componentUsersTabCancelButton" />
							</Button>
							<Button type="submit" className="save-btn">
								{uploadingNon && uploadingR && (
									<span className="spinner-border spinner-border-sm mr-1 text-primary"></span>
								)}
								<FormattedMessage defaultMessage="Save" id="componentUsersTabSaveButton" />
							</Button>
						</React.Fragment>
					) : null}
				</div>
			</Form>
		);
	};
	const renderCreatorForm = () => {
		return (
			<Form noValidate onSubmit={submitCreators}>
				<div className="px-4 py-4 border form-border border-color position-relative ">
					<Form.Row>
						<Form.Group as={Col} md="2" className="align-self">
							<h5 className="contact-us-email-text">
								<FormattedMessage defaultMessage="Add Creator" id="addCreatorLabel" />
							</h5>
						</Form.Group>

						<Form.Group as={Col} md="3" controlId="creatorFirstName">
							<Form.Label className="label-color">
								<FormattedMessage defaultMessage="First Name" id="creatorFirstNameLabel" />
							</Form.Label>
							<Form.Control
								type="email"
								value={creatorState.first_name}
								onChange={handleCreatorChange('first_name')}
								required
								className="setting-input-style border-top-0 border-left-0 border-right-0 rounded-0"
								maxLength="50"
							/>
							{creatorError.first_name && <div className="text-danger">{creatorError.first_name}</div>}
						</Form.Group>
						<Form.Group as={Col} md="3" controlId="creatotLastName">
							<Form.Label className="label-color">
								<FormattedMessage defaultMessage="Last Name" id="creatorLastNameLabel" />
							</Form.Label>
							<Form.Control
								type="email"
								value={creatorState.last_name}
								onChange={handleCreatorChange('last_name')}
								className="setting-input-style border-top-0 border-left-0 border-right-0 rounded-0"
								maxLength="50"
							/>
							{creatorError.last_name && <div className="text-danger">{creatorError.last_name}</div>}
						</Form.Group>
					</Form.Row>
				</div>
				<div className="my-4 d-flex justify-content-end bottom-btn-grp">
					<Button type="submit" className="save-btn">
						{creatingCreator === true && (
							<span className="spinner-border spinner-border-sm mr-1 text-primary"></span>
						)}
						<FormattedMessage defaultMessage="Save" id="componentUsersTabSaveButton" />
					</Button>
				</div>
			</Form>
		);
	};

	const handleTermsSubmit = (e) => {
		e.preventDefault();
		if (terms) {
			dispatch(settingActions.upload_terms(terms));
			setTerms('');
		} else {
			setError('This field is required');
		}
	};

	const renderSettingsEditor = () => {
		return (
			<div className="position-relative">
				<div className="terms-edit-icon" onClick={handleTermsEditMode}>
					<EditIcon />
				</div>

				<ReactQuill
					modules={Settings.modules}
					formats={Settings.formats}
					onChange={handleTermsChange}
					ref={editorRef}
					value={terms}
					placeholder="Write something amazing..."
					className="setting-input"
					readOnly={!termsEditMode}
				/>

				<div className="my-4 d-flex justify-content-end bottom-btn-grp">
					{error && <div className="text-danger">{error}</div>}
					{termsEditMode ? (
						<React.Fragment>
							<Button className="mr-4 cancel-btn" onClick={() => setTermsEditMode(!termsEditMode)}>
								<FormattedMessage defaultMessage="Cancel" id="componentUsersTabCancelButton" />
							</Button>
							<Button className="save-btn" onClick={handleTermsSubmit}>
								{uploadingTerms && <span className="spinner-border spinner-border-sm mr-1 text-primary"></span>}
								<FormattedMessage defaultMessage="Save" id="componentUsersTabSaveButton" />
							</Button>
						</React.Fragment>
					) : null}
				</div>
			</div>
		);
	};

	const handleFile = (e) => {
		let file = e.target.files[0];
		setFile(file);
	};

	const handleClick = (e) => {
		if (!file) {
			inputRef.current.click();
		} else {
		}
	};

	const renderUploadExcel = () => {
		return (
			<div className="d-flex alignment">
				<h4 className="standard-text">Standards</h4>
				<input style={{ display: 'none' }} type="file" name="file" ref={inputRef} onChange={handleFile} />
				<Button
					variant="outline-primary"
					onClick={handleClick}
					className="upload-excel set-hover-true"
					disabled={uploadingFile}
				>
					{uploadingFile && <span className="spinner-border spinner-border-sm mr-1 text-primary"></span>}
					Upload Excel File
				</Button>
			</div>
		);
	};

	return (
		<React.Fragment>
			<Layout>
				{renderSettingsEditor()}
				{renderContactUsEmailForm()}
				{creatingCreator === 'success' && (
					<React.Fragment>
						<MessageBar
							messageType="SUCCESS"
							message={'Creator created successfully'}
							handleClearMessage={handleClearMessage}
						/>
					</React.Fragment>
				)}
				{creatingCreator === 'fail' && (
					<React.Fragment>
						<MessageBar
							messageType="ERROR"
							message={'Creator created failed'}
							handleClearMessage={handleClearMessage}
						/>
					</React.Fragment>
				)}
				{renderCreatorForm()}
				{renderUploadExcel()}
			</Layout>
		</React.Fragment>
	);
};

Settings.modules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['link', 'image', 'video'],
		['clean'],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};

Settings.formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'video',
];

export default Settings;
