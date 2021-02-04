import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//components
import ReviewerQuestionsTable from "./../reviewer-questions-table/reviewer-questions-table";
import Pagination from "./../../Common/pagination/pagination.component";
import Layout from "../../ui/layout/layout.component";

// selectors
import { selectUserQuestions } from "../../../redux/question/question.select";
import { selectUserQuestionsCount } from "../../../redux/question/question.select";
import { selectUpdatingQuestion } from "./../../../redux/question/question.select";

//actions
import questionActions from "../../../redux/question/question.action";
import { setQuestionType } from "../../../redux/local/local.actions";
import { questionFormStateEdit } from "./../../../redux/questionFormState/questionFormState.action";

const MyReviews = () => {
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

   const userQuestions = useSelector(selectUserQuestions);
   const userQuestionsCount = useSelector(selectUserQuestionsCount);

   useEffect(() => {
      dispatch(questionActions.getUserQuestions(`reviewer_name=${userId}`));
   }, []);

   const indexOfLastQuestion = currentPage * questionsPerPage;
   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
   const currentQuestions =
      userQuestions &&
      userQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

   const handleReviewForm = (data) => {
      dispatch(questionActions.getSingleQuestion(data.id));
      dispatch(questionActions.getAnswer(data.id));
   };

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   return (
      <>
         <Layout>
            <ReviewerQuestionsTable
               questions={currentQuestions}
               handleReviewForm={handleReviewForm}
            />
            <Pagination
               perPage={questionsPerPage}
               total={userQuestionsCount}
               paginate={paginate}
               currentPage={currentPage}
            />
         </Layout>
      </>
   );
};

export default MyReviews;
