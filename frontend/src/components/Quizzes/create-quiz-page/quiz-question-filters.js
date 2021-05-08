import React from "react";
import { useSelector } from "react-redux";
import { Form, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { grades } from "../../../content";
import { setLocalStorage } from "../../../helpers/utils";
import { filterInitialState } from "../quizInitialStates";

const FilterInputsContainer = styled.div``;

const QuizQuestionFilters = ({
  filters,
  setFilters,
  handleSearch,
  standardCode,
}) => {
  const loadingUserQuestions = useSelector(
    (state) => state.question.loadingUserQuestions
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setLocalStorage("createQuizQuestionFilters", {
      ...filters,
      [name]: value,
    });
  };

  const handleClearList = () => {
    setFilters(filterInitialState);
    setLocalStorage("createQuizQuestionFilters", filterInitialState);
  };

  return (
    <FilterInputsContainer>
      <Form.Row className="justify-content-around mb-4">
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Grade</Form.Label>

          <Form.Control
            as="select"
            value={filters.grade_level}
            onChange={handleChange}
            name="grade_level"
          >
            <option value="_Any">{"_Any".slice(1)}</option>

            {grades.map((grade) => (
              <option key={grade}>{grade}</option>
            ))}
          </Form.Control>
        </Form.Group>
        {/* <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Standard Set</Form.Label>
          <Form.Control as="select">
            <option>3.0.q.1</option>
          </Form.Control>
        </Form.Group> */}
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Standard Code</Form.Label>
          <Form.Control
            as="select"
            value={filters.standard_code}
            onChange={handleChange}
            name="standard_code"
          >
            <option value="_Any">{"_Any".slice(1)}</option>

            {standardCode &&
              standardCode.map((code) => <option>{code}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Question Style</Form.Label>
          <Form.Control
            as="select"
            value={filters.question_style}
            onChange={handleChange}
            name="question_style"
          >
            <option value="_Any">{"_Any".slice(1)}</option>

            <option>Word</option>
            <option>Numeric</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Mills Diff.</Form.Label>
          <Form.Control
            as="select"
            style={{ width: "80px" }}
            value={filters.mills_difficulty_level}
            onChange={handleChange}
            name="mills_difficulty_level"
          >
            <option value="_Any">{"_Any".slice(1)}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">DOK</Form.Label>
          <Form.Control
            as="select"
            value={filters.dok}
            onChange={handleChange}
            name="dok"
          >
            <option value="_Any">{"_Any".slice(1)}</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Content Source</Form.Label>
          <Form.Control
            value={filters.content_source}
            onChange={handleChange}
            name="content_source"
          ></Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group
          as={Col}
          md={2}
          className="d-flex flex-column align-items-center"
        >
          <Form.Label className="question-label">Memo</Form.Label>
          <Form.Control
            value={filters.author_memo}
            onChange={handleChange}
            name="author_memo"
          ></Form.Control>
        </Form.Group>
        <Form.Group
          as={Col}
          md={2}
          className="d-flex flex-column align-items-center"
        >
          <Form.Label className="question-label">Summ. Status</Form.Label>
          <Form.Control
            as="select"
            style={{ width: "80px" }}
            value={filters.summative_status}
            onChange={handleChange}
            name="summative_status"
          >
            <option value="_Any">{"_Any".slice(1)}</option>

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
          <Form.Control
            as="select"
            style={{ width: "80px" }}
            value={filters.state_model}
            onChange={handleChange}
            name="state_model"
          >
            <option value="_Any">{"_Any".slice(1)}</option>

            <option>No</option>
            <option>Yes</option>
          </Form.Control>
        </Form.Group>

        <Form.Group
          as={Col}
          className="d-flex flex-column align-items-center justify-content-center"
          md={2}
        >
          <Button
            className="btn btn-custom btn-secondary-custom"
            onClick={handleClearList}
          >
            Reset Filters
          </Button>
        </Form.Group>
        <Form.Group
          as={Col}
          className="d-flex flex-column align-items-center justify-content-center"
          md={2}
        >
          <Button
            className="btn btn-custom btn-secondary-custom"
            onClick={handleSearch}
          >
            {loadingUserQuestions === true && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Search
          </Button>
        </Form.Group>
      </Form.Row>
    </FilterInputsContainer>
  );
};

export default QuizQuestionFilters;
