import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import parse from "html-react-parser";

import { answerFormat } from "./answer-format";
import { ImgWrapper } from "./ImgWrapper";

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

const QuizShowModal = ({ show, setShow, quiz, questions, studentView }) => {
  const questionView = () => {
    return (
      questions &&
      questions.map((question) => {
        const plainQuestionObj = !studentView
          ? question && question.question
          : question;

        return (
          <li>
            <p>{parse(plainQuestionObj && plainQuestionObj.value)}</p>
            {plainQuestionObj && plainQuestionObj.image && (
              <ImgWrapper>
                <img
                  src={plainQuestionObj.image}
                  style={{ width: "100%", maxWidth: "100%" }}
                  alt="question info pic"
                />
              </ImgWrapper>
            )}
            {answerFormat(plainQuestionObj)}
          </li>
        );
      })
    );
  };

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
        <StyledList>{questionView()}</StyledList>
      </Modal.Body>
    </Modal>
  );
};

export default QuizShowModal;
