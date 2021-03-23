import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import QuizQuestionFilters from "./quiz-question-filters";
import QuizQuestionSelectionList from "./quiz-question-selection-list";
import { SectionHead } from "../styles";
import RightButtonContainer from "../../styled/RightButtonContainer";

const SearchQuizContainer = styled.div``;

const SearchQuizQuestions = ({
  handleQuestions,
  selectedQuestions,
  setSelectedQuestions,
  filters,
  setFilters,
  search,
  queryStr,
  setSearch,
  handleSearch,
}) => {
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
      <QuizQuestionFilters
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
      />
      <QuizQuestionSelectionList
        handleChange={handleChange}
        search={search}
        queryStr={queryStr}
        setSearch={setSearch}
      />
      <RightButtonContainer>
        <Button onClick={handleQuestionAddition(selectedQuestions)}>
          Add to Quiz
        </Button>
      </RightButtonContainer>
    </SearchQuizContainer>
  );
};

export default SearchQuizQuestions;
