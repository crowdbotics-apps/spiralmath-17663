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

const allQuestions = [
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
         <EditorQuestionsTable questions={allQuestions} all={true} />
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
