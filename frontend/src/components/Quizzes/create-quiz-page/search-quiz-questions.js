import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import QuizQuestionFilters from "./quiz-question-filters";
import QuizQuestionSelectionList from "./quiz-question-selection-list";
import { SectionHead } from "../styles";
import RightButtonContainer from "../../styled/RightButtonContainer";

const SearchQuizContainer = styled.div``;

const SearchQuizQuestions = ({ handleQuestions }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  useEffect(() => {
    console.log("selected questions", selectedQuestions);
  }, [selectedQuestions]);
  const handleChange = (question) => (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedQuestions([...selectedQuestions, question]);
    } else {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q.id !== question.id)
      );
    }
  };
  const handleQuestionAddition = (questions) => () => {
    handleQuestions(questions);
  };
  return (
    <SearchQuizContainer>
      <SectionHead>Search Quiz Questions</SectionHead>
      <QuizQuestionFilters />
      <QuizQuestionSelectionList handleChange={handleChange} />
      <RightButtonContainer>
        <Button onClick={handleQuestionAddition(selectedQuestions)}>
          Add to quiz
        </Button>
      </RightButtonContainer>
    </SearchQuizContainer>
  );
};

export default SearchQuizQuestions;
