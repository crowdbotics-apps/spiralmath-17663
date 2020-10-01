import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//components
import EditorQuestionsTable from "../editor-questions-table/editor-questions-table.component";
import DeleteEditGroup from "../../ui/delete-edit-group/delete-edit-group.component";
import DeleteModal from "../../ui/delete-modal/delete-modal.component";
import Pagination from "./../../Common/pagination/pagination.component";

// selectors
import { selectDeleteState } from "../../../redux/question/question.select";
import { selectUserQuestions } from "../../../redux/question/question.select";
import { selectUserQuestionsCount } from "../../../redux/question/question.select";
import { selectUpdatingQuestion } from "./../../../redux/question/question.select";
import { selectDeletingQuestion } from "./../../../redux/question/question.select";

//actions
import questionActions from "../../../redux/question/question.action";
import { setQuestionType } from "../../../redux/local/local.actions";
import { questionFormStateEdit } from "./../../../redux/questioFormState/questionFormState.action";

const myQuestions = [
   {
      id: "00001",
      value: "How many leaves on the tree?",
      grade_level: "PK",
      approved_status: 10,
      feedback: "-/-",
      question_type: "mc",
   },
   {
      id: "00002",
      value: "How many leaves on the tree?",
      grade_level: "PK",
      approved_status: 20,
      feedback: "Hello Hi I am approved You",
      question_type: "t/f",
   },
   {
      id: "00003",
      value: "How many leaves on the tree?",
      grade_level: "PK",
      approved_status: 30,
      feedback: "Hello Hi I am approved You",
      question_type: "la",
   },
   {
      id: "00004",
      value: "How many leaves on the tree?",
      grade_level: "PK",
      approved_status: 10,
      feedback: "-/-",
      question_type: "sa",
   },
];

const MyQuestions = () => {
   const dispatch = useDispatch();
   //localUser
   const localUser =
      localStorage.getItem("user") !== "undefined"
         ? JSON.parse(localStorage.getItem("user"))
         : undefined;
   const userId = localUser && localUser.userObj && localUser.userObj.id;
   //pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [questionsPerPage] = useState(10);
   // delete modal
   const [showDeleteModal, setShowDeleteModal] = useState({ showModal: false });
   const userQuestions = useSelector(selectUserQuestions);
   const userQuestionsCount = useSelector(selectUserQuestionsCount);
   const updatingQuestion = useSelector(selectUpdatingQuestion);
   const deletingQuestion = useSelector(selectDeletingQuestion);

   useEffect(() => {
      if (!deletingQuestion) dispatch(questionActions.getUserQuestions());
   }, [deletingQuestion]);

   const indexOfLastQuestion = currentPage * questionsPerPage;
   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
   const currentQuestions =
      userQuestions &&
      userQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

   const handleOpen = (id) => {
      setShowDeleteModal({ ...showDeleteModal, showModal: true, id });
   };

   const handleClose = () => {
      setShowDeleteModal(false);
   };

   const handleEditForm = (data) => {
      dispatch(setQuestionType(data.question_type));
      dispatch(questionFormStateEdit(data));
   };

   const handleDelete = (id) => {
      dispatch(questionActions.deleteQuestion(id));
   };

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   const renderDeleteEdit = (id, data) => {
      return (
         <DeleteEditGroup
            handleShow={handleOpen}
            handleEditForm={handleEditForm}
            handleShowParam={id}
            handleEditFormParam={data}
         />
      );
   };

   return (
      <>
         <EditorQuestionsTable
            questions={currentQuestions}
            renderDeleteEdit={renderDeleteEdit}
         />
         <Pagination
            usersPerPage={questionsPerPage}
            totalUsers={userQuestionsCount}
            paginate={paginate}
            currentPage={currentPage}
         />
         <DeleteModal
            id={showDeleteModal.id}
            showModal={showDeleteModal.showModal}
            deleting={deletingQuestion}
            handleClose={handleClose}
            handleDelete={handleDelete}
            message="Question will be deleted"
            messageId="questionDeleteMessage"
         />
      </>
   );
};

export default MyQuestions;
