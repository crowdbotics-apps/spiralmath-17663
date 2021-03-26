import React from "react";
import { Modal } from "react-bootstrap";
import parse from "html-react-parser";

import { answerFormat } from "./answer-format";

const QuestionModal = ({ show, setShow, question }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-50w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body>
        <p>{parse((question && question.value) || "")}</p>

        {answerFormat(question)}
      </Modal.Body>
    </Modal>
  );
};

export default QuestionModal;
