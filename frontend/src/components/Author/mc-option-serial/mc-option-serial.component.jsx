import React from 'react';
import { Form, Col } from 'react-bootstrap';

import { ReactComponent as Tick } from '../../../assets/img/tick.svg';

const McOptionSerial = ({ serial, placeholder, value, isChecked, handleMcOptionChange, isReview }) => {
	return (
		<Form.Row className="d-flex">
			<Form.Group as={Col} md="0" className="align-self-center">
				<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="9" cy="9.5" r="8.63636" stroke="#979797" />
					<text x="47%" y="53%" textAnchor="middle" fill="#979797" dy=".3em">
						{serial + 1}
					</text>
				</svg>
			</Form.Group>
			<Form.Group as={Col} md="8" className="mr-5">
				<Form.Control
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={handleMcOptionChange(serial, 'text')}
					className=" border-top-0 border-left-0 border-right-0 rounded-0"
					disabled={isReview}
				/>
			</Form.Group>
			<Form.Group as={Col} md="1" className="d-flex justify-content-between align-items-center">
				<span className={`${isChecked && 'svg-color-green'}`} onClick={handleMcOptionChange(serial, 'check')}>
					<Tick />
				</span>
			</Form.Group>
		</Form.Row>
	);
};

export default McOptionSerial;
