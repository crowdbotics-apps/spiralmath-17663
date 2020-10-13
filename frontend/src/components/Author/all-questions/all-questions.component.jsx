import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//components
import EditorQuestionsTable from "../editor-questions-table/editor-questions-table.component";
import Pagination from "./../../Common/pagination/pagination.component";
import DeleteEditGroup from "../../ui/delete-edit-group/delete-edit-group.component";
import DeleteModal from "../../ui/delete-modal/delete-modal.component";

// selectors
import { selectAllQuestions } from "../../../redux/question/question.select";
import { selectAllQuestionsCount } from "../../../redux/question/question.select";
import { selectDeletingQuestion } from "./../../../redux/question/question.select";

//actions
import questionActions from "../../../redux/question/question.action";

const AllQuestions = () => {
   const dispatch = useDispatch();
   //pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [questionsPerPage] = useState(10);
   const [showDeleteModal, setShowDeleteModal] = useState({
      showModal: false,
   });

   const questions = [
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
   ]; //useSelector(selectAllQuestions);
   const questionsCount = useSelector(selectAllQuestionsCount);
   const deletingQuestion = useSelector(selectDeletingQuestion);

   useEffect(() => {
      if (!deletingQuestion) {
         dispatch(questionActions.getAllQuestions());
      }
   }, [deletingQuestion]);

   const handleOpen = (id) => {
      setShowDeleteModal({ ...showDeleteModal, showModal: true, id });
   };

   const handleClose = () => {
      setShowDeleteModal(false);
   };

   const handleDelete = (id) => {
      dispatch(questionActions.deleteQuestion(id));
      if (!deletingQuestion) {
         handleClose();
      }
   };

   const handleEditForm = (data) => {
      dispatch(questionActions.getSingleQuestion(data.id));
      dispatch(questionActions.getAnswer(data.id));
   };

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

   const indexOfLastQuestion = currentPage * questionsPerPage;
   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
   const currentQuestions =
      questions && questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   return (
      <>
         <EditorQuestionsTable
            questions={currentQuestions}
            all={true}
            renderDeleteEdit={renderDeleteEdit}
         />
         <Pagination
            usersPerPage={questionsPerPage}
            totalUsers={questionsCount}
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

export default AllQuestions;
