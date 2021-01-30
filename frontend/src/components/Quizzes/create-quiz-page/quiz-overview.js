import React from "react";
import styled from "styled-components";
import { SectionHead } from "../styles";
import QuizFinalList from "./quiz-final-list";

const QuizOverview = () => {
  return (
    <OverviewContainer>
      <HeadView>
        <SectionHead>Quiz Overview</SectionHead>
        <LinkColorButton>Student View</LinkColorButton>
      </HeadView>
      <HeadLevel2>
        <p>Grade 3</p>
        <p>Quiz 14</p>
        <p>Reviews Previous Year</p>
        <p>Quiz Sequence 14.0</p>
      </HeadLevel2>
      <QuizFinalList />
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
  font-familt: Open Sans !important;
`;

export default QuizOverview;
