import React, { useState } from "react";
import styled from "styled-components";
import { SectionHead } from "../styles";
import QuizFinalList from "./quiz-final-list";
import QuizModal from "../quiz-modal";

const QuizOverview = ({ quizData, dragEndCall, handleRemoveQuestion }) => {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const handleQuizModal = () => {
    setShowQuizModal(true);
  };
  return (
    <OverviewContainer>
      <HeadView>
        <SectionHead>Quiz Overview</SectionHead>
        <LinkColorButton onClick={handleQuizModal}>
          Student View
        </LinkColorButton>
      </HeadView>
      <HeadLevel2>
        <p>Grade {quizData.grade}</p>
        <p>{quizData.title}</p>
        <p>Reviews Previous Year</p>
        <p>Quiz Sequence {quizData.sequence}</p>
      </HeadLevel2>
      <QuizFinalList
        questions={quizData.questions}
        dragEndCall={dragEndCall}
        handleRemoveQuestion={handleRemoveQuestion}
      />
      <QuizModal
        show={showQuizModal}
        setShow={setShowQuizModal}
        quiz={quizData}
        questions={quizData.questions}
        studentView={true}
      />
    </OverviewContainer>
  );
};

const OverviewContainer = styled.div``;
const Head = styled.div`
  display: flex;
`;
const HeadView = styled(Head)``;
const HeadLevel2 = styled(Head)`
  width: 50%;
  margin-left: 10%;
  margin-bottom: 30px;
  justify-content: space-between;
`;
const LinkColorButton = styled.a`
  font-size: 14px;
  margin-left: 30px;
  border-bottom: 1px solid blue;
  display: inline-block;
  color: blue !important;
  height: fit-content;
  padding: 28px 0px;
  padding-bottom: 0px;
  font-family: Open Sans !important;
  cursor: pointer;
`;

export default QuizOverview;
