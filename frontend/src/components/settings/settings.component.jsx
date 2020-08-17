import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import ReactQuill from "react-quill";

import { settingActions } from "../../redux/setting/setting.actions";
import "../users-tab/users-tab.styles.css";

const Settings = () => {
  const intl = useIntl();

  const contactUsEmailForm = () => {
    return (
      <Form noValidate>
        <div className="px-4 py-4 border form-border border-color">
          <Form.Row>
            <Form.Group as={Col} md="2" className="align-self">
              <h5 className="contact-us-email-text">Contact Us Email</h5>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationEmail">
              <Form.Label className="label-color">Non Registered Users</Form.Label>
              <Form.Control
                type="email"
                required
                className="setting-input-style border-top-0 border-left-0 border-right-0 rounded-0"
                maxLength="50"
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationEmail">
              <Form.Label className="label-color">Registered Users</Form.Label>
              <Form.Control
                type="email"
                className="setting-input-style border-top-0 border-left-0 border-right-0 rounded-0"
                maxLength="50"
              />
            </Form.Group>
          </Form.Row>
        </div>
        <div className="my-4 d-flex justify-content-end bottom-btn-grp">
          <Button className="mr-4 cancel-btn">
            <FormattedMessage
              defaultMessage="Cancel"
              id="componentUsersTabCancelButton"
            />
          </Button>
          <Button type="submit" className="save-btn">
            <FormattedMessage
              defaultMessage="Save"
              id="componentUsersTabSaveButton"
            />
          </Button>
        </div>
      </Form>
    );
  };

  const settingsEditor = () => {
    return (
      <div>
        <ReactQuill
          modules={Settings.modules}
          formats={Settings.formats}
          placeholder="Write something amazing..."
          className="setting-input"
        />
        <div className="my-4 d-flex justify-content-end bottom-btn-grp">
          <Button className="mr-4 cancel-btn">
            <FormattedMessage
              defaultMessage="Cancel"
              id="componentUsersTabCancelButton"
            />
          </Button>
          <Button type="submit" className="save-btn">
            <FormattedMessage
              defaultMessage="Save"
              id="componentUsersTabSaveButton"
            />
          </Button>
        </div>
      </div>
    );
  };

  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState("");
  const inputRef = useRef(null);

  const handleFile = (e) => {
    let file = e.target.files[0];
    setFileError("");
    setFile(file);
  };

  const handleUpload = (e) => {
    if (!file) {
      setFileError("no file choosen");
    }

    if (!fileError) {
      let file = file;
      let formData = new FormData();
      formData.append("file", file);
    }
  };

  const uploadExcel = () => {
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

        <Button variant="outline-primary" onClick  className="upload-excel">
          Upload Excel File
        </Button>
      </div>
    );
  };

  return (
    <React.Fragment>
      {settingsEditor()}
      {contactUsEmailForm()}
      {uploadExcel()}
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
