import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import styled from "styled-components";

const FilterInputsContainer = styled.div``;

const QuizQuestionFilters = () => {
  return (
    <FilterInputsContainer>
      <Form.Row className="justify-content-around mb-4">
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Grade</Form.Label>
          <Form.Control as="select">
            <option>1</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Standard Set</Form.Label>
          <Form.Control as="select">
            <option>3.0.q.1</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Standard Code</Form.Label>
          <Form.Control></Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Question Style</Form.Label>
          <Form.Control as="select">
            <option>word</option>
            <option>numeric</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Mills Diff.</Form.Label>
          <Form.Control as="select" style={{ width: "55px" }}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">DOK</Form.Label>
          <Form.Control as="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Content Source</Form.Label>
          <Form.Control></Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group
          as={Col}
          md={2}
          className="d-flex flex-column align-items-center"
        >
          <Form.Label className="question-label">Memo</Form.Label>
          <Form.Control></Form.Control>
        </Form.Group>
        <Form.Group
          as={Col}
          md={2}
          className="d-flex flex-column align-items-center"
        >
          <Form.Label className="question-label">Summ. Status</Form.Label>
          <Form.Control as="select" style={{ width: "70px" }}>
            <option>No</option>
            <option>Yes</option>
          </Form.Control>
        </Form.Group>
        <Form.Group
          as={Col}
          md={2}
          className="d-flex flex-column align-items-center"
        >
          <Form.Label className="question-label">State Model</Form.Label>
          <Form.Control as="select" style={{ width: "70px" }}>
            <option>No</option>
            <option>Yes</option>
          </Form.Control>
        </Form.Group>

        <Form.Group
          as={Col}
          className="d-flex flex-column align-items-center justify-content-center"
          md={2}
        >
          <Button className="transparent-btn">Clear List</Button>
        </Form.Group>
        <Form.Group
          as={Col}
          className="d-flex flex-column align-items-center justify-content-center"
          md={2}
        >
          <Button className="transparent-btn">Search</Button>
        </Form.Group>
      </Form.Row>
    </FilterInputsContainer>
  );
};

export default QuizQuestionFilters;
