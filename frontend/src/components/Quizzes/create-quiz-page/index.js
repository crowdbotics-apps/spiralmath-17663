import React from "react";
import Layout from "../../ui/layout/layout.component";
import QuizFramework from "./quiz-framework";
import SearchQuizQuestions from "./search-quiz-questions";
import QuizOverview from "./quiz-overview";

const CreateQuiz = () => {
  return (
    <Layout>
      <QuizFramework />
      <hr />
      <SearchQuizQuestions />
      <hr />
      <QuizOverview />
    </Layout>
  );
};

export default CreateQuiz;
