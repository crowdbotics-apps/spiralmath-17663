import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//components
import EditorQuestionsTable from "../editor-questions-table/editor-questions-table.component";
import Pagination from "./../../Common/pagination/pagination.component";

// selectors
import { selectAllQuestions } from "../../../redux/question/question.select";
import { selectAllQuestionsCount } from "../../../redux/question/question.select";

//actions
import questionActions from "../../../redux/question/question.action";

const AllQuestions = () => {
   const dispatch = useDispatch();
   //pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [questionsPerPage] = useState(10);

   const questions = useSelector(selectAllQuestions);
   const questionsCount = useSelector(selectAllQuestionsCount);

   useEffect(() => {
      dispatch(questionActions.getAllQuestions());
   }, []);

   const indexOfLastQuestion = currentPage * questionsPerPage;
   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
   const currentQuestions =
      questions && questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   return (
      <>
         <EditorQuestionsTable questions={currentQuestions} all={true} />
         <Pagination
            usersPerPage={questionsPerPage}
            totalUsers={questionsCount}
            paginate={paginate}
            currentPage={currentPage}
         />
      </>
   );
};

export default AllQuestions;
