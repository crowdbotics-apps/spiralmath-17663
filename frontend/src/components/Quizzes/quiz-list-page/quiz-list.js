/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import DeleteEditGroup from "../../ui/delete-edit-group/delete-edit-group.component";
import DeleteModal from "../../ui/delete-modal/delete-modal.component";
import Pagination from "../../Common/pagination/pagination.component";
import {
  selectQuizCount,
  selectDeletingQuiz,
} from "../../../redux/quiz/quiz.select";

import quizActions from "../../../redux/quiz/quiz.actions";

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
  const dispatch = useDispatch();
  const quizCount = useSelector(selectQuizCount);
  const deletingQuiz = useSelector(selectDeletingQuiz);
  const [deleteModalState, setDeleteModalState] = useState({
    show: false,
    id: null,
  });

  useEffect(() => {
    if (!deletingQuiz) {
      handleClose();
    }
  }, [deletingQuiz]);

  const handleClose = () => {
    setDeleteModalState({ ...deleteModalState, show: false });
  };

  const handleDeleteQuiz = (id) => {
    dispatch(quizActions.deleteQuiz(id));
  };
  return (
    <Row>
      <Col className="mt-3">
        <div>
          <Table bordered className="border-top-0 border-left-0 border-right-0">
            <thead>
              <tr>
                <th scope="col" className="border-0 font-style thead">
                  {deleteModalState.show.toString()}
                  {/* <FormattedMessage
                    defaultMessage="Quiz ID"
                    id="QuizListHeadId"
                  /> */}
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
                          handleShow={() => {
                            setDeleteModalState({
                              ...deleteModalState,
                              show: true,
                              id: quiz.id,
                            });
                          }}
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
        {deleteModalState.show ? (
          <DeleteModal
            id={deleteModalState.id}
            showModal={deleteModalState.show}
            deleting={deletingQuiz}
            handleClose={handleClose}
            handleDelete={handleDeleteQuiz}
            message="User will be deleted"
            messageId="componentUsersTabDeleteModalWarning"
          />
        ) : null}
      </Col>
    </Row>
  );
};

export default QuizList;
