import React from "react";
import { Modal } from "react-bootstrap";
import parse from "html-react-parser";

const QuestionModal = ({ show, setShow, question }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-50w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body>{parse((question && question.value) || "")}</Modal.Body>
    </Modal>
  );
};

export default QuestionModal;
