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
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const questions = useSelector(selectAllQuestions);
	const questionsCount = useSelector(selectAllQuestionsCount);

	useEffect(() => {
		dispatch(questionActions.getAllQuestions((currentPage -1) * questionsPerPage));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Layout>
				<ReviewerQuestionsTable questions={questions} all={true} />
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
