/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Row, Col, Table } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import DeleteEditGroup from "../../ui/delete-edit-group/delete-edit-group.component";
import DeleteModal from "../../ui/delete-modal/delete-modal.component";
import Pagination from "../../Common/pagination/pagination.component";
import {
  selectQuizCount,
  selectDeletingQuiz,
} from "../../../redux/quiz/quiz.select";
import QuizShowModal from "../quiz-modal";
import { selectSingleQuizQuestions } from "../../../redux/quiz/quiz.select";
import quizActions from "../../../redux/quiz/quiz.actions";
import { ReactComponent as UpArrowIcon } from "../../../assets/img/up-arrow-icon.svg";
import { ReactComponent as DownArrowIcon } from "../../../assets/img/down-arrow-icon.svg";

const QuizList = ({
  quizzes,
  quizPerPage,
  paginate,
  currentPage,
  setOrderBySequence,
  orderBySequence,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const quizCount = useSelector(selectQuizCount);
  const deletingQuiz = useSelector(selectDeletingQuiz);
  const [deleteModalState, setDeleteModalState] = useState({
    show: false,
    id: null,
  });
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({});
  const quizQuestions = useSelector(selectSingleQuizQuestions);

  const handleQuizShow = (quiz) => () => {
    setCurrentQuiz(quiz);
    dispatch(quizActions.getQuiz(quiz.id));
    setShowQuiz(true);
  };

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
  const changeSequence = () => {
    setOrderBySequence(!orderBySequence);
  };

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
                <th
                  scope="col"
                  className="border-0 font-style thead pointerType"
                  onClick={changeSequence}
                >
                  <span>
                    {orderBySequence ? <UpArrowIcon /> : <DownArrowIcon />}
                  </span>
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
                        <LinkColorButton onClick={handleQuizShow(quiz)}>
                          {quiz.title}
                        </LinkColorButton>
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
                          handleEditForm={() => {
                            history.push("/create-quiz");
                            dispatch(quizActions.getQuiz(quiz.id));
                          }}
                          handleShowParam={1}
                          handleEditFormParam={quiz.id}
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
            message="Quiz will be deleted"
            messageId="QuizDeleteModalWarning"
          />
        ) : null}
        <QuizShowModal
          show={showQuiz}
          setShow={setShowQuiz}
          questions={quizQuestions}
          quiz={currentQuiz}
        />
      </Col>
    </Row>
  );
};

const LinkColorButton = styled.a`
  font-size: 14px;
  border-bottom: 1px solid blue;
  display: inline-block;
  color: blue !important;
  font-family: Open Sans !important;
  cursor: pointer;
`;

export default QuizList;
