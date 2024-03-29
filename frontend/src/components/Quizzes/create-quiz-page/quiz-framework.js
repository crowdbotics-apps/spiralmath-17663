import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Form, Col } from "react-bootstrap";
import { SectionHead } from "../styles";
import { grades } from "../../../content";
import MessageBar from "../../ui/message-bar/message-bar.component";
import { selectQuizError } from "../../../redux/quiz/quiz.select";

const FrameworkBox = styled.div``;

const FieldBox = styled.div``;

const QuizFramework = ({ handleChange, quizData, errors }) => {
  const error = useSelector(selectQuizError);
  return (
    <FrameworkBox>
      <SectionHead>Quiz Framework</SectionHead>
      {error && (
        <React.Fragment>
          <div></div>
          <MessageBar messageType="ERROR" message={error.message} />
        </React.Fragment>
      )}
      <FieldBox>
        <Form.Row className="justify-content-around mb-4">
          <Form.Group
            as={Col}
            md="0.5"
            className="d-flex flex-column align-items-center"
          >
            <Form.Label className="question-label">Grade</Form.Label>
            <Form.Control
              as="select"
              name="grade"
              value={quizData.grade}
              onChange={handleChange}
            >
              {grades.map((grade) => (
                <option key={grade}>{grade}</option>
              ))}
            </Form.Control>
            {errors.grade && (
              <p className="text-danger form-text-danger">{errors.grade}</p>
            )}
          </Form.Group>
          <Form.Group
            as={Col}
            md="2"
            className="d-flex flex-column align-items-center"
          >
            <Form.Label className="question-label">Title</Form.Label>
            <Form.Control
              as="input"
              name="title"
              value={quizData.title}
              onChange={handleChange}
            ></Form.Control>
            {errors.title && (
              <p className="text-danger form-text-danger text-nowrap">
                {"Required"}
              </p>
            )}
          </Form.Group>

          <Form.Group
            as={Col}
            md="3"
            className="d-flex flex-column align-items-center"
          >
            <Form.Label className="question-label">Footer</Form.Label>
            <Form.Control
              as="input"
              name="footer"
              value={quizData.footer}
              onChange={handleChange}
            ></Form.Control>
            {errors.footer && (
              <p className="text-danger form-text-danger">{errors.footer}</p>
            )}
          </Form.Group>
          <Form.Group
            as={Col}
            md="3"
            className="d-flex flex-column align-items-center"
          >
            <Form.Label className="question-label">Description</Form.Label>
            <Form.Control
              as="input"
              name="description"
              value={quizData.description}
              onChange={handleChange}
            ></Form.Control>
            {errors.description && (
              <p className="text-danger form-text-danger">
                {errors.description}
              </p>
            )}
          </Form.Group>
          <Form.Group
            as={Col}
            md="2"
            className="d-flex flex-column align-items-center"
          >
            <Form.Label className="question-label">Quiz Sequence</Form.Label>
            <Form.Control
              as="input"
              style={{ width: "50%" }}
              name="sequence"
              value={quizData.sequence}
              onChange={handleChange}
            ></Form.Control>
            {errors.sequence && (
              <p className="text-danger form-text-danger">{errors.sequence}</p>
            )}
          </Form.Group>
        </Form.Row>
      </FieldBox>
    </FrameworkBox>
  );
};

export default QuizFramework;
