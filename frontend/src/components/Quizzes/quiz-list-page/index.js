import React from "react";
import styled from "styled-components";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Layout from "../../ui/layout/layout.component";
import QuizList from "./quiz-list";
import { SectionHead } from "../styles";

const options = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
];

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GradeFilter = styled.div`
  display: flex;
`;

const SelectBox = styled.div`
  margin-left: 10px;
`;

const QuizListPage = () => {
  return (
    <Layout>
      <SectionHead>Quizzes</SectionHead>
      <Header>
        <Link to="/create-quiz">
          <Button className="transparent-btn">Create Quiz</Button>
        </Link>
      </Header>
      <GradeFilter>
        <Form.Label className="question-label">Grade</Form.Label>
        <SelectBox>
          <Select options={options} defaultValue={options[1]} />
        </SelectBox>
      </GradeFilter>
      <QuizList />
    </Layout>
  );
};

export default QuizListPage;
