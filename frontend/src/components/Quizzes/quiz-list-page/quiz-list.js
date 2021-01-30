import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import DeleteEditGroup from "../../ui/delete-edit-group/delete-edit-group.component";

const quizzes = [
  {
    id: 1,
    title: "Quiz 1",
    description: "quiz 1 is associzted with mcq and short answers",
    sequence: 1,
  },
  {
    id: 2,
    title: "Quiz 1",
    description: "quiz 1 is associzted with mcq and short answers",
    sequence: 1,
  },
  {
    id: 3,
    title: "Quiz 1",
    description: "quiz 1 is associzted with mcq and short answers",
    sequence: 1,
  },
  {
    id: 4,
    title: "Quiz 1",
    description: "quiz 1 is associzted with mcq and short answers",
    sequence: 1,
  },
  {
    id: 5,
    title: "Quiz 1",
    description: "quiz 1 is associzted with mcq and short answers",
    sequence: 1,
  },
];

const QuizList = () => {
  return (
    <Row>
      <Col className="mt-3">
        <div>
          <Table bordered className="border-top-0 border-left-0 border-right-0">
            <thead>
              <tr>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Quiz ID"
                    id="QuizListHeadId"
                  />
                </th>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Title"
                    id="QuizListHeadTitle"
                  />
                </th>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Description"
                    id="QuizListHeadDesc"
                  />
                </th>
                <th scope="col" className="border-0 font-style thead">
                  <FormattedMessage
                    defaultMessage="Sequence"
                    id="QuizListHeadSeq"
                  />
                </th>
                <th scope="col" className="border-0 font-style thead"></th>
              </tr>
            </thead>
            <tbody>
              {quizzes &&
                quizzes.map((quiz) => {
                  return (
                    <tr key={quiz.id}>
                      <td className="border-right-0">{quiz.id}</td>
                      <td className="border-right-0 border-left-0">
                        {quiz.title}
                      </td>
                      <td className="border-right-0 border-left-0">
                        {quiz.description}
                      </td>
                      <td className="border-right-0 border-left-0">
                        {quiz.sequence}
                      </td>
                      <td className="border-left-0">
                        <DeleteEditGroup
                          handleShow={() => {}}
                          handleEditForm={() => {}}
                          handleShowParam={1}
                          handleEditFormParam={{}}
                        />
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

export default QuizList;
