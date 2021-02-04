import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import DeleteEditGroup from "../../ui/delete-edit-group/delete-edit-group.component";
import Pagination from "../../Common/pagination/pagination.component";
import { selectQuizCount } from "../../../redux/quiz/quiz.select";

// const quizzes = [
//   {
//     id: 1,
//     title: "Quiz 1",
//     description: "quiz 1 is associzted with mcq and short answers",
//     sequence: 1,
//   },
//   {
//     id: 2,
//     title: "Quiz 1",
//     description: "quiz 1 is associzted with mcq and short answers",
//     sequence: 1,
//   },
//   {
//     id: 3,
//     title: "Quiz 1",
//     description: "quiz 1 is associzted with mcq and short answers",
//     sequence: 1,
//   },
//   {
//     id: 4,
//     title: "Quiz 1",
//     description: "quiz 1 is associzted with mcq and short answers",
//     sequence: 1,
//   },
//   {
//     id: 5,
//     title: "Quiz 1",
//     description: "quiz 1 is associzted with mcq and short answers",
//     sequence: 1,
//   },
// ];

const QuizList = ({ quizzes, quizPerPage, paginate, currentPage }) => {
  const quizCount = useSelector(selectQuizCount);
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
          <Pagination
            perPage={quizPerPage}
            total={quizCount}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </Col>
    </Row>
  );
};

export default QuizList;
