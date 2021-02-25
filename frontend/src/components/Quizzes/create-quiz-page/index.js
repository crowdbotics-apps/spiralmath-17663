import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Layout from "../../ui/layout/layout.component";
import QuizFramework from "./quiz-framework";
import SearchQuizQuestions from "./search-quiz-questions";
import QuizOverview from "./quiz-overview";
import { grades } from "../../../content";
import RightButtonContainer from "../../styled/RightButtonContainer";
import quizActions from "../../../redux/quiz/quiz.actions";
import { selectCreatingQuiz } from "../../../redux/quiz/quiz.select";
import MessageBar from "../../ui/message-bar/message-bar.component";

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const creatingQuiz = useSelector(selectCreatingQuiz);
  const [quizData, setQuizData] = useState({
    grade: grades[0],
    title: "",
    order: "",
    description: "",
    footer: "",
    sequence: "",
    questions: [
      // {
      //   serialNo: "1",
      //   order: 1,
      //   grade: 1,
      //   standard: "3.0293.44",
      //   millsDiff: 1,
      //   dok: 1,
      //   question: "What is your name ?",
      // },
      // {
      //   serialNo: "2",
      //   order: 2,
      //   grade: 2,
      //   standard: "4.83.20",
      //   millsDiff: 3,
      //   dok: 2,
      //   question: "What is your name ?",
      // },
      // {
      //   serialNo: "3",
      //   order: 3,
      //   grade: 1,
      //   standard: "823.3452dd.3d",
      //   millsDiff: 2,
      //   dok: 4,
      //   question: "What is your name ?",
      // },
      // {
      //   serialNo: "4",
      //   order: 4,
      //   grade: 2,
      //   standard: "s5h3.3j",
      //   millsDiff: 2,
      //   dok: 3,
      //   question: "What is your name ?",
      // },
    ],
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    console.log("quiz Data", quizData);
  }, [quizData]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(checked);
    setQuizData((quizData) => ({ ...quizData, [name]: value }));
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleQuestions = (questions) => {
    questions.map((question, index) => ({ ...question, order: index + 1 }));
    setQuizData({ ...quizData, questions });
  };

  const dragEndCall = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const tempQuestionState = Object.assign([], quizData.questions);

    const sourceQuestion = quizData.questions[source.index];
    tempQuestionState.splice(source.index, 1);
    tempQuestionState.splice(destination.index, 0, sourceQuestion);
    console.log("temp", tempQuestionState);

    setQuizData({
      ...quizData,
      questions: tempQuestionState.map((question, index) => ({
        ...question,
        order: index + 1,
      })),
    });
  };

  const handleSave = () => {
    let tempQuestions = quizData.questions.map((question) => ({
      question: question.id,
      order: question.order,
    }));
    const data = { ...quizData, question: tempQuestions };
    dispatch(quizActions.createQuiz(data));
  };

  const handleClearMessage = () => {
    dispatch(quizActions.resetLoadings());
  };

  return (
    <Layout>
      {creatingQuiz === "success" && (
        <React.Fragment>
          <div></div>
          <MessageBar
            messageType="SUCCESS"
            message={"Quiz created successfully"}
            handleClearMessage={handleClearMessage}
          />
        </React.Fragment>
      )}
      {creatingQuiz === "fail" && (
        <React.Fragment>
          <div></div>
          <MessageBar
            messageType="ERROR"
            message={"Quiz creation failed. Try again"}
            handleClearMessage={handleClearMessage}
          />
        </React.Fragment>
      )}

      <QuizFramework handleChange={handleChange} quizData={quizData} />
      <hr />
      <SearchQuizQuestions handleQuestions={handleQuestions} />
      <hr />
      <QuizOverview quizData={quizData} dragEndCall={dragEndCall} />
      <RightButtonContainer>
        <Button onClick={handleSave}>
          {creatingQuiz === true && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save to quiz
        </Button>
      </RightButtonContainer>
    </Layout>
  );
};

export default CreateQuiz;
