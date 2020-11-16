import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';

const ReviewInput = ({ handleChange, reviewer_feedback, approved_status, handleRadioChange }) => {
	return (
		<Form.Row className="mt-3 ml-5">
			<Form.Check
				inline
				label="Approved"
				type="radio"
				className="radio-check"
				name="approved_status"
				value={20}
				onChange={handleRadioChange}
				checked={approved_status === 20}
			/>
			<Form.Check
				inline
				label="Reject"
				type="radio"
				className="ml-3"
				name="approved_status"
				value={30}
				onChange={handleRadioChange}
				checked={approved_status === 30}
			/>

			<Form.Group as={Col} md="9" className="ml-3 mr-4">
				<Form.Control
					type="text"
					value={reviewer_feedback}
					name="reviewer_feedback"
					onChange={handleChange}
					className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
						reviewer_feedback && reviewer_feedback.length && 'label-up'
					}`}
				/>
				<span className="floating-label">Feedback</span>
			</Form.Group>
		</Form.Row>
	);
};

export default ReviewInput;
