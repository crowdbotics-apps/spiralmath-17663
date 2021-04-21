/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Layout from "../../ui/layout/layout.component";
import QuizList from "./quiz-list";
import { SectionHead } from "../styles";
import { grades } from "../../../content/";
import {
  selectAllQuizzes,
  selectDeletingQuiz,
} from "../../../redux/quiz/quiz.select";
import quizActions from "../../../redux/quiz/quiz.actions";

const gradeOptions = [
  { value: "Any", label: "Any" },
  ...grades.map((value) => ({ value, label: value })),
];

const selectStyles = {
  valueContainer: (provided, state) => ({
    ...provided,
    width: "33px",
  }),
};

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GradeFilter = styled.div`
  display: flex;
  align-items: center;
`;

const SelectBox = styled.div`
  margin-left: 10px;
`;

const QuizListPage = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector(selectAllQuizzes);
  const deletingQuiz = useSelector(selectDeletingQuiz);

  const [currentPage, setCurrentPage] = useState(1);
  const [quizPerPage] = useState(5);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e) => {
    const queryStr = `grade=${e.value}`;
    dispatch(
      quizActions.getAllQuizzes((currentPage - 1) * quizPerPage, queryStr)
    );
  };

  useEffect(() => {
    dispatch(quizActions.getAllQuizzes((currentPage - 1) * quizPerPage));
  }, [currentPage, deletingQuiz]);

  const handleResetQuizData = () => {
    dispatch(quizActions.resetQuizData());
  };

  return (
    <Layout>
      <SectionHead>Quizzes</SectionHead>
      <Header>
        <Link to="/create-quiz">
          <Button className="transparent-btn" onClick={handleResetQuizData}>
            Create Quiz
          </Button>
        </Link>
      </Header>
      <GradeFilter>
        <Form.Label className="question-label">Grade</Form.Label>
        <SelectBox>
          <Select
            styles={selectStyles}
            options={gradeOptions}
            defaultValue={gradeOptions[0]}
            onChange={handleChange}
          />
        </SelectBox>
      </GradeFilter>
      <QuizList
        quizzes={quizzes}
        paginate={paginate}
        quizPerPage={quizPerPage}
        currentPage={currentPage}
      />
    </Layout>
  );
};

export default QuizListPage;
