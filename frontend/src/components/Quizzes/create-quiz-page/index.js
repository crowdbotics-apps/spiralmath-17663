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
import questionActions from "../../../redux/question/question.action";
import { selectStandardCode } from "../../../redux/question/question.select";
import { selectQuizError } from "../../../redux/quiz/quiz.select";
import { clearQuizError } from "../../../redux/quiz/quiz.actions";

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectQuizError);
  const editQuizData = useSelector(selectSingleQuiz);
  const standardCode = useSelector(selectStandardCode);
  const creatingQuiz = useSelector(selectCreatingQuiz);
  const [quizData, setQuizData] = useState({
    grade: grades[0],
    title: "",
    order: "",
    description: "",
    footer: "",
    sequence: "",
    questions: [],
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [search, setSearch] = useState(false);
  const [queryStr, setQueryStr] = useState("");
  const [filters, setFilters] = useState({
    grade_level: "_Select Grade",
    mills_difficulty_level: "_Select Mills.",
    dok: "_Select_dok",
    question_style: "_Select style",
    summative_status: "_Select summative status",
    state_model: "_Select state model",
    standard_code: "_Select Standard",
    content_source: "",
    author_memo: "",
  });

  useEffect(() => {
    dispatch(questionActions.getStandardCode());
    return () => handleClearMessage();
  }, []);

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
    if (error.key === name) {
      dispatch(clearQuizError());
    }
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
    if (editQuizData === null) {
      dispatch(quizActions.createQuiz(data));
    } else {
      dispatch(quizActions.editQuiz(data));
    }
  };

  const handleSave = () => {
    setSubmitted(true);
    setFormErrors(validateCreateQuiz(quizData));
  };

  const handleClearMessage = () => {
    dispatch(quizActions.resetLoadings());
  };

  useEffect(() => {
    let timeout;
    if (creatingQuiz === "success" || creatingQuiz === "fail") {
      timeout = setTimeout(() => {
        handleClearMessage();
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [creatingQuiz]);

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
        standardCode={standardCode}
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
          Save Quiz
        </Button>
      </RightButtonContainer>
    </Layout>
  );
};

export default CreateQuiz;
