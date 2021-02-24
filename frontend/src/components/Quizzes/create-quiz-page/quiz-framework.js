import React from "react";
import styled from "styled-components";
import { Form, Col } from "react-bootstrap";
import { SectionHead } from "../styles";
import { grades } from "../../../content";

const FrameworkBox = styled.div``;

const FieldBox = styled.div``;

const QuizFramework = ({ handleChange, quizData }) => {
  return (
    <FrameworkBox>
      <SectionHead>Quiz Framework</SectionHead>
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
                <option>{grade}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            as={Col}
            md="1"
            className="d-flex flex-column align-items-center"
          >
            <Form.Label className="question-label">Title</Form.Label>
            <Form.Control
              as="input"
              name="title"
              value={quizData.title}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            className="d-flex flex-column align-items-center"
          >
            <Form.Label className="question-label">Footer</Form.Label>
            <Form.Control
              as="input"
              name="footer"
              value={quizData.footer}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            as={Col}
            md="3"
            className="d-flex flex-column align-items-center"
            name="description"
            value={quizData.description}
            onChange={handleChange}
          >
            <Form.Label className="question-label">Description</Form.Label>
            <Form.Control as="input"></Form.Control>
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
              value={quizData.value}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
        </Form.Row>
      </FieldBox>
    </FrameworkBox>
  );
};

export default QuizFramework;
