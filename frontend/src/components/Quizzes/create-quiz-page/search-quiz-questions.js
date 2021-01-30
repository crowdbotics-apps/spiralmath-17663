import React from "react";
import styled from "styled-components";
import QuizQuestionFilters from "./quiz-question-filters";
import QuizQuestionSelectionList from "./quiz-question-selection-list";
import { SectionHead } from "../styles";

const SearchQuizContainer = styled.div``;

const SearchQuizQuestions = () => {
  return (
    <SearchQuizContainer>
      <SectionHead>Search Quiz Questions</SectionHead>
      <QuizQuestionFilters />
      <QuizQuestionSelectionList />
    </SearchQuizContainer>
  );
};

export default SearchQuizQuestions;
