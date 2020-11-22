import React from 'react';
import { Form, Col } from 'react-bootstrap';

const AuthorDetails = ({ author_name, reviewer_name, created, reviewer_date }) => {
	return (
		<Form.Row className="mb-3">
			<Form.Group as={Col} md="3">
				<Form.Control
					type="text"
					value={author_name}
					className={`border-top-0 border-left-0 border-right-0 rounded-0 ${author_name && 'label-up'}`}
					readOnly
				/>
				<span className="floating-label">Author Name</span>
			</Form.Group>
			<Form.Group as={Col} md="3">
				<Form.Control
					type="text"
					value={reviewer_name}
					className={`border-top-0 border-left-0 border-right-0 rounded-0 ${reviewer_name && 'label-up'}`}
					readOnly
				/>
				<span className="floating-label">Reviewer Name</span>
			</Form.Group>
			<Form.Group as={Col} md="3">
				<Form.Control
					type="text"
					value={created}
					className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
						created && created.length && 'label-up'
					}`}
					readOnly
				/>
				<span className="floating-label">Created Date</span>
			</Form.Group>
			<Form.Group as={Col} md="3">
				<Form.Control
					type="text"
					value={reviewer_date}
					className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
						reviewer_date && reviewer_date.length && 'label-up'
					}`}
					readOnly
				/>
				<span className="floating-label">Reviewed Date</span>
			</Form.Group>
		</Form.Row>
	);
};

export default AuthorDetails;
