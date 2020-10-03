import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//components
import EditorQuestionsTable from "../editor-questions-table/editor-questions-table.component";
import DeleteEditGroup from "../../ui/delete-edit-group/delete-edit-group.component";
import DeleteModal from "../../ui/delete-modal/delete-modal.component";
import Pagination from "./../../Common/pagination/pagination.component";

// selectors
import { selectUserQuestions } from "../../../redux/question/question.select";
import { selectUserQuestionsCount } from "../../../redux/question/question.select";
import { selectUpdatingQuestion } from "./../../../redux/question/question.select";
import { selectDeletingQuestion } from "./../../../redux/question/question.select";

//actions
import questionActions from "../../../redux/question/question.action";
import { setQuestionType } from "../../../redux/local/local.actions";
import { questionFormStateEdit } from "./../../../redux/questioFormState/questionFormState.action";

const MyQuestions = () => {
   const dispatch = useDispatch();
   //localUser
   const localUser =
      localStorage.getItem("user") !== "undefined"
         ? JSON.parse(localStorage.getItem("user"))
         : undefined;
   const userName =
      localUser &&
      localUser.userObj &&
      localUser.userObj.first_name + " " + localUser.userObj.last_name;
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
      if (!deletingQuestion)
         dispatch(questionActions.getUserQuestions());
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
      dispatch(questionActions.getAnswer(data.id));
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
