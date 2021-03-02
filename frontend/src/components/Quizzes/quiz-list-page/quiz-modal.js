import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import parse from "html-react-parser";

const StyledList = styled.ol`
  list-style: none;
  counter-reset: my-awesome-counter;
  & li {
    counter-increment: my-awesome-counter;
  }
  & li::before {
    content: counter(my-awesome-counter) ". ";
    color: red;
    font-weight: bold;
  }
`;

const QuizShowModal = ({ show, setShow, quiz, questions }) => {
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header className="justify-content-center" closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {quiz && quiz.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StyledList>
          {questions &&
            questions.map((question) => {
              return <li>{parse(question.value)}</li>;
            })}
        </StyledList>
      </Modal.Body>
    </Modal>
  );
};

export default QuizShowModal;
