import React from "react";
import { Row, Col, Table, Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const questions = [
  {
    id: "1",
    grade: 1,
    standardCode: "Quiz 1",
    style: 1,
    millsDiff: 1,
    dok: 1,
    question: "What is your name ?",
    source: "3.02.344",
  },
  {
    id: "2",
    grade: 1,
    standardCode: "Quiz 1",
    style: 1,
    millsDiff: 1,
    dok: 1,
    question: "What is your name ?",
    source: "3.02.344",
  },
  {
    id: "3",
    grade: 1,
    standardCode: "Quiz 1",
    style: 1,
    millsDiff: 1,
    dok: 1,
    question: "What is your name ?",
    source: "3.02.344",
  },
  {
    id: "4",
    grade: 1,
    standardCode: "Quiz 1",
    style: 1,
    millsDiff: 1,
    dok: 1,
    question: "What is your name ?",
    source: "3.02.344",
  },
];

const QuizQuestionSelectionList = () => {
  return (
    <Row>
      <Col className="mt-3">
        <div>
          <Table bordered className="border-top-0 border-left-0 border-right-0">
            <thead>
              <tr>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Grade"
                    id="QuestionSearchListGrade"
                  />
                </th>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Standard"
                    id="QuestionSearchListCode"
                  />
                </th>

                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Mills Diff"
                    id="QuestionSearchListMillsDiff"
                  />
                </th>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="DOK"
                    id="QuestionSearchListDOK"
                  />
                </th>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Question"
                    id="QuestionSearchListQuestion"
                  />
                </th>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Source"
                    id="QuestionSearchListSource"
                  />
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
              {questions &&
                questions.map((question) => {
                  return (
                    <tr key={question.id}>
                      <td className="border-right-0">{question.grade}</td>
                      <td className="border-right-0 border-left-0">
                        {question.standardCode}
                      </td>
                      <td className="border-right-0 border-left-0">
                        {question.style}
                      </td>
                      <td className="border-right-0 border-left-0">
                        {question.millsDiff}
                      </td>
                      <td className="border-left-0 border-right-0">
                        {question.dok}
                      </td>
                      <td className="border-left-0 border-right-0">
                        {question.question}
                      </td>
                      <td className="border-left-0 border-right-0">
                        {question.source}
                      </td>
                      <td className="border-left-0 ">
                        <Form.Check />
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
