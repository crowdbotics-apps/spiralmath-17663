import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import parse from "html-react-parser";

import { answerFormat } from "../Quizzes/answer-format";
import { ImgWrapper } from "../Quizzes/ImgWrapper";

const MetaDataField = styled.div`
  width: 50%;
`;
const Key = styled.span`
  margin-right: 10px;
`;

const QuestionModal = ({ show, setShow, question, isReview = false }) => {
  const [questionMetaData, setQuestionMetaData] = useState({});

  useEffect(() => {
    question &&
      setQuestionMetaData({
        "ID Number": question.id,
        "Difficulty Level": question.mills_difficulty_level,
        "Standard code": question.standard_code,
        "Content source": question.content_source,
      });
  }, [question]);

  const renderQuestionMetaData = () => {
    const data = Object.entries(questionMetaData);
    return (
      <>
        {data.map((d) => {
          return (
            <MetaDataField>
              <Key>{d[0]}</Key>
              <span>{d[1]}</span>
            </MetaDataField>
          );
        })}
      </>
    );
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-50w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body>
        <Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
        <p>{parse((question && question.value) || "")}</p>
        {question && question.image && (
          <ImgWrapper>
            <img
              src={question.image}
              style={{ width: "100%", maxWidth: "100%" }}
              alt="question info pic"
            />
          </ImgWrapper>
        )}
        {answerFormat(question)}
        {isReview && (
          <div className="d-flex flex-wrap">
            {questionMetaData && renderQuestionMetaData()}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default QuestionModal;
