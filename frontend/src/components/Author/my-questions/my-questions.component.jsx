import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//components
import EditorQuestionsTable from '../editor-questions-table/editor-questions-table.component';
import DeleteEditGroup from '../../ui/delete-edit-group/delete-edit-group.component';
import DeleteModal from '../../ui/delete-modal/delete-modal.component';
import Pagination from './../../Common/pagination/pagination.component';
import Layout from '../../ui/layout/layout.component';

// selectors
import { selectUserQuestions } from '../../../redux/question/question.select';
import { selectUserQuestionsCount } from '../../../redux/question/question.select';
import { selectUpdatingQuestion } from './../../../redux/question/question.select';
import { selectDeletingQuestion } from './../../../redux/question/question.select';

//actions
import questionActions from '../../../redux/question/question.action';

const MyQuestions = () => {
	const dispatch = useDispatch();
	//localUser
	const localUser =
		localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : undefined;
	const userId = localUser && localUser.userObj && localUser.userObj.id;
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
		if (!deletingQuestion) {
			dispatch(questionActions.getUserQuestions(`user=${userId}`));
			setShowDeleteModal(false);
		}
	}, [deletingQuestion]);

	const indexOfLastQuestion = currentPage * questionsPerPage;
	const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
	const currentQuestions = userQuestions && userQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

	const handleOpen = (id) => {
		setShowDeleteModal({ ...showDeleteModal, showModal: true, id });
	};

	const handleClose = () => {
		setShowDeleteModal(false);
	};

	const handleEditForm = (data) => {
		dispatch(questionActions.getSingleQuestion(data.id));
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
			<Layout>
				<EditorQuestionsTable questions={currentQuestions} renderDeleteEdit={renderDeleteEdit} />
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
			</Layout>
		</>
	);
};

export default MyQuestions;
