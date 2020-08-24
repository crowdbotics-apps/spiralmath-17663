import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import ReactQuill from "react-quill";

import settingActions from "../../redux/setting/setting.actions";
import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";

const Settings = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [emailsEditMode, setEmailsEditMode] = useState(false);
  const [termsEditMode, setTermsEditMode] = useState(false);
  const [file, setFile] = useState("");
  const [terms, setTerms] = useState("");
  const [emails, setEmails] = useState({
    registered: "",
    non_registered: "",
  });
  const uploadingFile = useSelector(
    (state) => state.mainSettings.uploadingFile
  );
  const uploadingEmails = useSelector(
    (state) => state.mainSettings.uploadingEmails
  );
  const uploadingTerms = useSelector(
    (state) => state.mainSettings.uploadingTerms
  );
  const settings = useSelector((state) => state.mainSettings.settings);
  let dispSet;

  if (settings.length > 0) {
    settings.map((el) => {
      if (
        el.path === "terms-condition" ||
        el.path === "standard-code" ||
        el.path === "non-registered-email" ||
        el.path === "registered-email"
      ) {
        dispSet[el.path] = el.value;
      }
    });
    setTerms(dispSet["terms-condition"]);
    setEmails({
      non_registered: dispSet["non-registered-email"],
      registered: dispSet["registered-email"],
    });
  }

  useEffect(() => {
    dispatch(settingActions.get_settings());
  }, []);

  useEffect(() => {
    if (file) {
      let formData = new FormData();
      formData.append("file", file);
      dispatch(settingActions.upload_file(formData));
      setFile("");
    }
  }, [file]);

  const handleEmailsEditMode = () => {
    setEmailsEditMode(!emailsEditMode);
  };

  const handleTermsEditMode = () => {
    setTermsEditMode(!termsEditMode);
  };

  const handleTermsChange = (e) => {
    setTerms(e.replace("<br>", "<br/>"));
  };

  const handleEmailChange = (name) => (e) => {
    const { value } = e.target;
    setEmails({ ...emails, [name]: value });
  };

  const emailsSubmit = (e) => {
    e.preventDefault();
    if (emails.non_registered && emails.registered) {
      dispatch(settingActions.upload_emails());
    }
    setEmails({ non_registered: "", registered: "" });
  };

  const renderContactUsEmailForm = () => {
    return (
      <Form noValidate onSubmit={emailsSubmit}>
        <div className="px-4 py-4 border form-border border-color">
          <Form.Row>
            <Form.Group as={Col} md="2" className="align-self">
              <h5 className="contact-us-email-text">
                <FormattedMessage
                  defaultMessage="Contact Us Email"
                  id="componentSettingsContact"
                />
              </h5>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationEmail">
              <Form.Label className="label-color">
                <FormattedMessage
                  defaultMessage=" Non Registered Users"
                  id="componentSettingsNonRegUser"
                />
              </Form.Label>
              <Form.Control
                type="email"
                value={emails.non_registered}
                onChange={handleEmailChange("non_registered")}
                required
                className="setting-input-style border-top-0 border-left-0 border-right-0 rounded-0"
                maxLength="50"
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationEmail">
              <Form.Label className="label-color">
                <FormattedMessage
                  defaultMessage="Registered Users"
                  id="componentSettingsRegUser"
                />
              </Form.Label>
              <Form.Control
                type="email"
                value={emails.registered}
                onChange={handleEmailChange("registered")}
                className="setting-input-style border-top-0 border-left-0 border-right-0 rounded-0"
                maxLength="50"
              />
            </Form.Group>
            <div className="emails-edit-icon" onClick={handleEmailsEditMode}>
              <EditIcon />
            </div>
          </Form.Row>
        </div>
        <div className="my-4 d-flex justify-content-end bottom-btn-grp">
          {emailsEditMode ? (
            <React.Fragment>
              <Button className="mr-4 cancel-btn">
                <FormattedMessage
                  defaultMessage="Cancel"
                  id="componentUsersTabCancelButton"
                />
              </Button>
              <Button type="submit" className="save-btn">
                {uploadingEmails && (
                  <span className="spinner-border spinner-border-sm mr-1 text-primary"></span>
                )}
                <FormattedMessage
                  defaultMessage="Save"
                  id="componentUsersTabSaveButton"
                />
              </Button>
            </React.Fragment>
          ) : null}
        </div>
      </Form>
    );
  };

  const handleTermsSubmit = (e) => {
    e.preventDefault();
    if (terms) {
      dispatch(settingActions.upload_terms(terms));
      setTerms("");
    }
  };

  const renderSettingsEditor = () => {
    return (
      <div>
        <div className="terms-edit-icon" onClick={handleTermsEditMode}>
          <EditIcon />
        </div>

        <ReactQuill
          modules={Settings.modules}
          formats={Settings.formats}
          onChange={handleTermsChange}
          value={terms}
          placeholder="Write something amazing..."
          className="setting-input"
        />
        <div className="my-4 d-flex justify-content-end bottom-btn-grp">
          {termsEditMode ? (
            <React.Fragment>
              <Button className="mr-4 cancel-btn">
                <FormattedMessage
                  defaultMessage="Cancel"
                  id="componentUsersTabCancelButton"
                />
              </Button>
              <Button className="save-btn" onClick={handleTermsSubmit}>
                {uploadingTerms && (
                  <span className="spinner-border spinner-border-sm mr-1 text-primary"></span>
                )}
                <FormattedMessage
                  defaultMessage="Save"
                  id="componentUsersTabSaveButton"
                />
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
        <input
          style={{ display: "none" }}
          type="file"
          name="file"
          ref={inputRef}
          onChange={handleFile}
        />
        <Button
          variant="outline-primary"
          onClick={handleClick}
          className="upload-excel"
          disabled={uploadingFile}
        >
          {uploadingFile && (
            <span className="spinner-border spinner-border-sm mr-1 text-primary"></span>
          )}
          Upload Excel File
        </Button>
      </div>
    );
  };

  return (
    <React.Fragment>
      {renderSettingsEditor()}
      {renderContactUsEmailForm()}
      {renderUploadExcel()}
    </React.Fragment>
  );
};

Settings.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

Settings.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default Settings;
