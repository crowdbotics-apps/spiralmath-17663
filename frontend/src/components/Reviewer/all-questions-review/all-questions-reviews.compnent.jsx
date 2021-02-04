import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//components
import ReviewerQuestionsTable from './../reviewer-questions-table/reviewer-questions-table';
import Pagination from './../../Common/pagination/pagination.component';
import Layout from '../../ui/layout/layout.component';

// selectors
import { selectAllQuestions } from '../../../redux/question/question.select';
import { selectAllQuestionsCount } from '../../../redux/question/question.select';

//actions
import questionActions from '../../../redux/question/question.action';

const AllQuestionsReviews = () => {
	const dispatch = useDispatch();
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [questionsPerPage] = useState(10);

	const questions = useSelector(selectAllQuestions);
	const questionsCount = 7; //useSelector(selectAllQuestionsCount);

	useEffect(() => {
		dispatch(questionActions.getAllQuestions());
	}, []);

	const indexOfLastQuestion = currentPage * questionsPerPage;
	const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
	const currentQuestions = questions && questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<Layout>
				<ReviewerQuestionsTable questions={currentQuestions} all={true} />
				<Pagination
					perPage={questionsPerPage}
					total={questionsCount}
					paginate={paginate}
					currentPage={currentPage}
				/>
			</Layout>
		</>
	);
};

export default AllQuestionsReviews;
