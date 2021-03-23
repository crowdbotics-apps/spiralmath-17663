/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import questionActions from "../../../redux/question/question.action";
import parse from "html-react-parser";
import { selectUserQuestions } from "../../../redux/question/question.select";
import QuestionModal from "../question-modal";

const QuizQuestionSelectionList = ({
  handleChange,
  search,
  setSearch,
  queryStr,
}) => {
  const dispatch = useDispatch();
  const localUser =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;
  const userId = localUser && localUser.userObj && localUser.userObj.id;
  const userQuestions = useSelector(selectUserQuestions);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  useEffect(() => {
    if (search) {
      console.log("queryStr", queryStr);
      dispatch(questionActions.getUserQuestions(`user=${userId}${queryStr}`));
      setSearch(false);
    }
  }, [search]);

  useEffect(() => {
    dispatch(questionActions.getUserQuestions(`user=${userId}`));
  }, []);

  const handleQuestionModal = (question) => () => {
    setCurrentQuestion(question);
    setShowQuestionModal(true);
  };

  return (
    <Row>
      <Col className="mt-3">
        <div>
          <Table bordered className="border-top-0 border-left-0 border-right-0">
            <thead>
              {
                //   <tr>
                //   <th scope="col" className="border-0 font-style thead">
                //     <FormattedMessage
                //       defaultMessage="Grade"
                //       id="QuestionSearchListGrade"
                //     />
                //   </th>
                //   <th scope="col" className="border-0 font-style thead">
                //     <FormattedMessage
                //       defaultMessage="Standard"
                //       id="QuestionSearchListCode"
                //     />
                //   </th>
                //   <th scope="col" className="border-0 font-style thead">
                //     <FormattedMessage
                //       defaultMessage="Mills Diff"
                //       id="QuestionSearchListMillsDiff"
                //     />
                //   </th>
                //   <th scope="col" className="border-0 font-style thead">
                //     <FormattedMessage
                //       defaultMessage="DOK"
                //       id="QuestionSearchListDOK"
                //     />
                //   </th>
                //   <th scope="col" className="border-0 font-style thead">
                //     <FormattedMessage
                //       defaultMessage="Question"
                //       id="QuestionSearchListQuestion"
                //     />
                //   </th>
                //   <th scope="col" className="border-0 font-style thead">
                //     <FormattedMessage
                //       defaultMessage="Source"
                //       id="QuestionSearchListSource"
                //     />
                //   </th>
                //   <th scope="col" className="border-0 font-style thead">
                //     <FormattedMessage
                //       defaultMessage="Select"
                //       id="QuestionSearchListSelect"
                //     />
                //   </th>
                // </tr>
              }
              <tr>
                <th scope="col" className="border-0 font-style thead">
                  Grade
                </th>
                <th scope="col" className="border-0 font-style thead">
                  Standard
                </th>
                <th scope="col" className="border-0 font-style thead">
                  Style
                </th>
                <th scope="col" className="border-0 font-style thead">
                  Mills Diff
                </th>
                <th scope="col" className="border-0 font-style thead">
                  DOK
                </th>
                <th scope="col" className="border-0 font-style thead">
                  Question
                </th>
                <th scope="col" className="border-0 font-style thead">
                  source
                </th>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Select"
                    id="QuestionSearchListSelect"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {userQuestions &&
                userQuestions.map((question) => {
                  return (
                    <tr key={question.id}>
                      {
                        // <td className="border-right-0">{question.grade}</td>
                        //     <td className="border-right-0 border-left-0">
                        //       {question.standardCode}
                        //     </td>
                        //     <td className="border-right-0 border-left-0">
                        //       {question.style}
                        //     </td>
                        //     <td className="border-right-0 border-left-0">
                        //       {question.millsDiff}
                        //     </td>
                        //     <td className="border-left-0 border-right-0">
                        //       {question.dok}
                        //     </td>
                        //     <td className="border-left-0 border-right-0">
                        //       {question.question}
                        //     </td>
                        //     <td className="border-left-0 border-right-0">
                        //       {question.source}
                        //     </td>
                      }
                      <td className="border-right-0">
                        {question && question.grade_level}
                      </td>
                      <td className="border-right-0 border-left-0">
                        {question && question.standard_code}
                      </td>
                      <td className="border-right-0 border-left-0">
                        {question && question.question_style}
                      </td>
                      <td className="border-right-0 border-left-0">
                        {question && question.mills_difficulty_level}
                      </td>
                      <td className="border-right-0 border-left-0">
                        {question && question.dok}
                      </td>

                      <td
                        className="border-left-0 border-right-0 pointerType"
                        onClick={handleQuestionModal(question)}
                      >
                        {question.value && parse(question.value)}
                      </td>
                      <td className="border-right-0 border-left-0">
                        {question && question.content_source}
                      </td>
                      <td className="border-left-0 ">
                        <Form.Check onChange={handleChange(question)} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Col>
      <QuestionModal
        show={showQuestionModal}
        setShow={setShowQuestionModal}
        question={currentQuestion}
      />
    </Row>
  );
};

export default QuizQuestionSelectionList;
