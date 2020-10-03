import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";

const ReviewInput = ({ handleChange, reviewer_feedback }) => {
   // const [review,setReview] = setReview({approved_status:"",reviewer_feedback:""})

   return (
      <Form.Row className="mt-3 ml-5">
         <Form.Check
            inline
            label="Approved"
            type="radio"
            className="radio-check"
         />
         <Form.Check inline label="Reject" type="radio" className="ml-3" />

         <Form.Group as={Col} md="9" className="ml-3 mr-4">
            <Form.Control
               type="text"
               value={reviewer_feedback}
               name="reviewer_feedback"
               onChange={handleChange}
               className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
                  reviewer_feedback && reviewer_feedback.length && "label-up"
               }`}
            />
            <span className="floating-label">Feedback</span>
         </Form.Group>
      </Form.Row>
   );
};

export default ReviewInput;
