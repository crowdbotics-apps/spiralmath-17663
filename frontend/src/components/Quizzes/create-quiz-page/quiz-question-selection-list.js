/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import questionActions from "../../../redux/question/question.action";
import { selectUserQuestions } from "../../../redux/question/question.select";

const QuizQuestionSelectionList = ({ handleChange }) => {
  const dispatch = useDispatch();
  const localUser =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;
  const userId = localUser && localUser.userObj && localUser.userObj.id;
  const userQuestions = useSelector(selectUserQuestions);
  useEffect(() => {
    dispatch(questionActions.getUserQuestions(`user=${userId}`));
  }, []);
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
                  Question
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
                        {userQuestions && userQuestions.grade_level}
                      </td>
                      <td className="border-left-0 border-right-0">
                        {userQuestions && userQuestions.value}
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
    </Row>
  );
};

export default QuizQuestionSelectionList;
