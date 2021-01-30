import React from "react";
import styled from "styled-components";
import { Form, Col } from "react-bootstrap";
import { SectionHead } from "../styles";

const FrameworkBox = styled.div``;

const FieldBox = styled.div``;

const QuizFramework = () => {
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
            <Form.Control as="select">
              <option>1</option>
            </Form.Control>
          </Form.Group>
          <Form.Group
            as={Col}
            md="1"
            className="d-flex flex-column align-items-center"
          >
            <Form.Label className="question-label">Title</Form.Label>
            <Form.Control as="input"></Form.Control>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            className="d-flex flex-column align-items-center"
          >
            <Form.Label className="question-label">Footer</Form.Label>
            <Form.Control as="input"></Form.Control>
          </Form.Group>
          <Form.Group
            as={Col}
            md="3"
            className="d-flex flex-column align-items-center"
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
            <Form.Control as="input" style={{ width: "50%" }}></Form.Control>
          </Form.Group>
        </Form.Row>
      </FieldBox>
    </FrameworkBox>
  );
};

export default QuizFramework;
