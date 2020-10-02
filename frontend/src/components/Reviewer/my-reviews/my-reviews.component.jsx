import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//components
import ReviewerQuestionsTable from "./../reviewer-questions-table/reviewer-questions-table";
import Pagination from "./../../Common/pagination/pagination.component";

// selectors
import { selectUserQuestions } from "../../../redux/question/question.select";
import { selectUserQuestionsCount } from "../../../redux/question/question.select";
import { selectUpdatingQuestion } from "./../../../redux/question/question.select";

//actions
import questionActions from "../../../redux/question/question.action";
import { setQuestionType } from "../../../redux/local/local.actions";
import { questionFormStateEdit } from "./../../../redux/questioFormState/questionFormState.action";

const MyReviews = () => {
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

   const userQuestions = [
      {
         id: 1,
         value: "How many leaves are there in the tree?",
         author_name: "Cameron Williamson",
         approved_status: 10,
         reviewer_feedback: "Nice work",
         question_type: "mc",
      },
      {
         id: 2,
         value: "How many leaves are there in the tree?",
         author_name: "Theresa Webb",
         approved_status: 10,
         reviewer_feedback: "Nice work",
         question_type: "la",
      },
      {
         id: 3,
         value: "How many leaves are there in the tree?",
         author_name: "Darrell Steward",
         approved_status: 10,
         reviewer_feedback: "Nice work",
         question_type: "sa",
      },
      {
         id: 4,
         value: "How many leaves are there in the tree?",
         author_name: "Guy Hawkins",
         approved_status: 10,
         reviewer_feedback: "Nice work",
         question_type: "t/f",
      },
      {
         id: 5,
         value: "How many leaves are there in the tree?",
         author_name: "Wade Warren",
         approved_status: 10,
         reviewer_feedback: "Nice work",
         question_type: "mc",
      },
   ]; //useSelector(selectUserQuestions);
   const userQuestionsCount = useSelector(selectUserQuestionsCount);
   const updatingQuestion = useSelector(selectUpdatingQuestion);

   useEffect(() => {
      dispatch(questionActions.getUserQuestions(`reviewer_name="${userName}"`));
   }, []);

   const indexOfLastQuestion = currentPage * questionsPerPage;
   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
   const currentQuestions =
      userQuestions &&
      userQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

   const handleReviewForm = (data) => {
      dispatch(setQuestionType(data.question_type));
      dispatch(questionFormStateEdit(data));
   };

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   return (
      <>
         <ReviewerQuestionsTable
            questions={currentQuestions}
            handleReviewForm={handleReviewForm}
         />
         <Pagination
            usersPerPage={questionsPerPage}
            totalUsers={userQuestionsCount}
            paginate={paginate}
            currentPage={currentPage}
         />
      </>
   );
};

export default MyReviews;
