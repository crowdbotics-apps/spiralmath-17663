import React, { useState } from "react";
import { useSelector } from "react-redux";

//components
import EditorQuestionsTable from "../editor-questions-table/editor-questions-table.component";
import DeleteEditGroup from "./../ui/delete-edit-group/delete-edit-group.component";
import DeleteModal from "../ui/delete-modal/delete-modal.component";
import { selectDeleteState } from "./../../redux/question/question.select";

const myQuestions = [
   {
      id: "00001",
      question: "How many leaves on the tree?",
      gradeLevel: "PK",
      status: "Pending",
      feedback: "-/-",
   },
   {
      id: "00002",
      question: "How many leaves on the tree?",
      gradeLevel: "PK",
      status: "Pending",
      feedback: "-/-",
   },
   {
      id: "00003",
      question: "How many leaves on the tree?",
      gradeLevel: "PK",
      status: "Pending",
      feedback: "-/-",
   },
   {
      id: "00004",
      question: "How many leaves on the tree?",
      gradeLevel: "PK",
      status: "Pending",
      feedback: "-/-",
   },
];

const MyQuestions = () => {
   const [showDeleteModal, setShowDeleteModal] = useState({ showModal: false });
   const deletingQuestion = useSelector(selectDeleteState);

   const handleOpen = (id) => {
      setShowDeleteModal({ ...showDeleteModal, showModal: true, id });
   };

   const handleClose = () => {
      setShowDeleteModal(false);
   };

   const handleEditForm = (data) => {
      console.log(data);
   };

   const handleDelete = (id) => {
      console.log(id);
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

   return (
      <>
         <EditorQuestionsTable
            questions={myQuestions}
            renderDeleteEdit={renderDeleteEdit}
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
