import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import ReactQuill from "react-quill";

import "../users-tab/users-tab.styles.css";

const Settings = () => {
  const intl = useIntl();

  const contactUsEmailForm = () => {
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

  const settingsEditor = () => {
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

  const uploadExcel = () => {
    return (
      <div>
        <h4>Standards</h4>
        <Button variant="outline-primary">Primary</Button>
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
