/* eslint-disable react-hooks/exhaustive-deps */
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
import { validateCreateQuiz } from "../../../helpers/validation/validationQuiz";
import { selectSingleQuiz } from "../../../redux/quiz/quiz.select";
import { buildQueryStr } from "../../../helpers/utils";

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const editQuizData = useSelector(selectSingleQuiz);
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
      //   id: 1,
      //   order: 1,
      //   grade_level: 1,
      //   standard: "3.0293.44",
      //   millsDiff: 1,
      //   dok: 1,
      //   value: "What is your name ?",
      // },
      // {
      //   serialNo: "2",
      //   id: 2,
      //   order: 2,
      //   grade_level: 2,
      //   standard: "4.83.20",
      //   millsDiff: 3,
      //   dok: 2,
      //   value: "What is your name ?",
      // },
      // {
      //   serialNo: "3",
      //   id: 3,
      //   order: 3,
      //   grade_level: 1,
      //   standard: "823.3452dd.3d",
      //   millsDiff: 2,
      //   dok: 4,
      //   value: "What is your name ?",
      // },
      // {
      //   serialNo: "4",
      //   id: 4,
      //   order: 4,
      //   grade_level: 2,
      //   standard: "s5h3.3j",
      //   millsDiff: 2,
      //   dok: 3,
      //   value: "What is your name ?",
      // },
    ],
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [search, setSearch] = useState(false);
  const [queryStr, setQueryStr] = useState("");
  const [filters, setFilters] = useState({
    grade_level: "",
    mills_difficulty_level: "",
    dok: "",
    question_style: "",
    summative_status: "",
    state_model: "",
    standard_code: "",
    content_source: "",
    author_memo: "",
  });

  const handleSearch = () => {
    setSearch(true);
    setQueryStr(buildQueryStr(filters));
  };

  const handleRemoveQuestion = (id) => () => {
    setSelectedQuestions((prevQuestion) =>
      prevQuestion.filter((question) => question.id !== id)
    );
    setQuizData((prevQuizData) => ({
      ...prevQuizData,
      questions: prevQuizData.questions.filter(
        (question) => question.id !== id
      ),
    }));
    setQuizData((prevData) => ({
      ...quizData,
      questions: prevData.questions.map((question, index) => ({
        ...question,
        order: index + 1,
      })),
    }));
  };

  useEffect(() => {
    editQuizData &&
      setQuizData({
        ...quizData,
        grade: editQuizData.grade,
        title: editQuizData.title,
        order: editQuizData.order,
        description: editQuizData.description,
        footer: editQuizData.footer,
        sequence: editQuizData.sequence,
      });
  }, [editQuizData]);
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && submitted) {
      submit();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((quizData) => ({ ...quizData, [name]: value }));
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleQuestions = (questions) => {
    const tempQuestions = questions.map((question, index) => ({
      ...question,
      order: index + 1,
    }));
    setQuizData({ ...quizData, questions: tempQuestions });
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
    setQuizData({
      ...quizData,
      questions: tempQuestionState.map((question, index) => ({
        ...question,
        order: index + 1,
      })),
    });
  };
  const submit = () => {
    const tempQuestions = quizData.questions.map((question) => ({
      question: question.id,
      order: question.order,
    }));
    const data = { ...quizData, order: 111, questions: tempQuestions };
    dispatch(quizActions.createQuiz(data));
  };

  const handleSave = () => {
    setSubmitted(true);
    setFormErrors(validateCreateQuiz(quizData));
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

      <QuizFramework
        handleChange={handleChange}
        quizData={quizData}
        errors={formErrors}
      />
      <hr />
      <SearchQuizQuestions
        handleQuestions={handleQuestions}
        setQuizData={setQuizData}
        selectedQuestions={selectedQuestions}
        setSelectedQuestions={setSelectedQuestions}
        filters={filters}
        setFilters={setFilters}
        search={search}
        queryStr={queryStr}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <hr />
      <QuizOverview
        quizData={quizData}
        dragEndCall={dragEndCall}
        handleRemoveQuestion={handleRemoveQuestion}
      />
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
