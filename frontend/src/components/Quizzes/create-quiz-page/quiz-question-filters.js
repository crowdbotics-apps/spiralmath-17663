import React, { useEffect } from "react";
import { Form, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { grades } from "../../../content";

const FilterInputsContainer = styled.div``;

const QuizQuestionFilters = ({
  filters,
  setFilters,
  handleSearch,
  standardCode,
}) => {
  useEffect(() => {
    console.log("filters", filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleClearList = () => {
    setFilters({
      grade_level: "",
      mills_difficulty_level: "",
      dok: "",
      question_style: "",
      summative_status: "",
      state_model: "",
      standard_code: "",
      content_source: "",
      author_memo: "",
    });
  };

  const iterableStandardCode =
    (standardCode &&
      standardCode.detail &&
      standardCode.detail["Standard Code"].filter((value, index, self) => {
        return self.indexOf(value) === index;
      })) ||
    [];

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
            {iterableStandardCode.map((code) => (
              <option>{code}</option>
            ))}
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
            <option>word</option>
            <option>numeric</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label className="question-label">Mills Diff.</Form.Label>
          <Form.Control
            as="select"
            style={{ width: "55px" }}
            value={filters.mills_difficulty_level}
            onChange={handleChange}
            name="mills_difficulty_level"
          >
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
            style={{ width: "70px" }}
            value={filters.summative_status}
            onChange={handleChange}
            name="summative_status"
          >
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
            style={{ width: "70px" }}
            value={filters.state_model}
            onChange={handleChange}
            name="state_model"
          >
            <option>No</option>
            <option>Yes</option>
          </Form.Control>
        </Form.Group>

        <Form.Group
          as={Col}
          className="d-flex flex-column align-items-center justify-content-center"
          md={2}
        >
          <Button className="transparent-btn" onClick={handleClearList}>
            Clear List
          </Button>
        </Form.Group>
        <Form.Group
          as={Col}
          className="d-flex flex-column align-items-center justify-content-center"
          md={2}
        >
          <Button className="transparent-btn" onClick={handleSearch}>
            Search
          </Button>
        </Form.Group>
      </Form.Row>
    </FilterInputsContainer>
  );
};

export default QuizQuestionFilters;
