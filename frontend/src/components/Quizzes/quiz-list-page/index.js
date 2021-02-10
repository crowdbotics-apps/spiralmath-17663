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

const gradeOptions = grades.map((value) => ({ value, label: value }));

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
`;

const SelectBox = styled.div`
  margin-left: 10px;
`;

const QuizListPage = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector(selectAllQuizzes);
  const deletingQuiz = useSelector(selectDeletingQuiz);

  const [currentPage, setCurrentPage] = useState(1);
  const [quizPerPage] = useState(10);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(quizActions.getAllQuizzes((currentPage - 1) * quizPerPage));
  }, [currentPage, deletingQuiz]);

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
          <Select
            styles={selectStyles}
            options={gradeOptions}
            defaultValue={gradeOptions[1]}
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
