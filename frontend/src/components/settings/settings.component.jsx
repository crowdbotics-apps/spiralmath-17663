import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import ReactQuill from "react-quill";

import settingActions from "../../redux/setting/setting.actions";
import "../users-tab/users-tab.styles.css";

const Settings = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [file, setFile] = useState("");

  useEffect(() => {
    if (file) {
      let formData = new FormData();
      formData.append("file", file);
      dispatch(settingActions.upload_file(formData));
      setFile("");
    }
  }, [file]);

  const renderContactUsEmailForm = () => {
    return (
      <Form noValidate>
        <div className="px-4 py-4 border form-border">
          <Form.Row>
            <Form.Group as={Col} md="3">
              <h5>Contact Us Email</h5>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationEmail">
              <Form.Label>Non Registered Users</Form.Label>
              <Form.Control
                type="email"
                required
                className="border-top-0 border-left-0 border-right-0 rounded-0"
                maxLength="50"
              />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationEmail">
              <Form.Label>Registered Users</Form.Label>
              <Form.Control
                type="email"
                className="border-top-0 border-left-0 border-right-0 rounded-0"
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

  const renderSettingsEditor = () => {
    return (
      <div>
        <ReactQuill
          modules={Settings.modules}
          formats={Settings.formats}
          placeholder="Write something amazing..."
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
      <div>
        <h4>Standards</h4>
        <input
          style={{ display: "none" }}
          type="file"
          name="file"
          ref={inputRef}
          onChange={handleFile}
        />

        <Button variant="outline-primary" onClick={handleClick}>
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
