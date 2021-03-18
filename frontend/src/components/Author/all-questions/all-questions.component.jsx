/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//components
import EditorQuestionsTable from '../editor-questions-table/editor-questions-table.component';
import Pagination from './../../Common/pagination/pagination.component';
import DeleteEditGroup from '../../ui/delete-edit-group/delete-edit-group.component';
import DeleteModal from '../../ui/delete-modal/delete-modal.component';
import Layout from '../../ui/layout/layout.component';

// selectors
import { selectAllQuestions } from '../../../redux/question/question.select';
import { selectAllQuestionsCount } from '../../../redux/question/question.select';
import { selectDeletingQuestion } from './../../../redux/question/question.select';

//actions
import questionActions from '../../../redux/question/question.action';

const AllQuestions = () => {
	const dispatch = useDispatch();
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [questionsPerPage] = useState(10);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const [showDeleteModal, setShowDeleteModal] = useState({
		showModal: false,
	});

	let questions = useSelector(selectAllQuestions);
	const questionsCount = useSelector(selectAllQuestionsCount);
	const deletingQuestion = useSelector(selectDeletingQuestion);

	useEffect(() => {
		if (!deletingQuestion) {
			dispatch(questionActions.getAllQuestions(`limit=${questionsPerPage}&offset=${(currentPage - 1) * questionsPerPage}`));
			handleClose();
		}
	}, [deletingQuestion,currentPage]);

	const handleOpen = (id) => {
		setShowDeleteModal({ ...showDeleteModal, showModal: true, id });
	};

	const handleClose = () => {
		setShowDeleteModal(false);
	};

	const handleDelete = (id) => {
		dispatch(questionActions.deleteQuestion(id));
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

	


	return (
		<>
			<Layout>
				<EditorQuestionsTable questions={questions} all={true} renderDeleteEdit={renderDeleteEdit} />
				<Pagination
					perPage={questionsPerPage}
					total={questionsCount}
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
			</Layout>
		</>
	);
};

export default AllQuestions;
