import React from "react";

const ReviewInput = () => {
   return (
      <Form.Row className="mt-3">
         <Form.Group as={Col} md="4"></Form.Group>
         <Form.Group as={Col} md="4"></Form.Group>
         <Form.Group as={Col} md="4">
            <Form.Control
               type="text"
               value={grade_level}
               name="grade_level"
               onChange={handleChange}
               className={`border-top-0 border-left-0 border-right-0 rounded-0 ${
                  grade_level.length && "label-up"
               }`}
            />
            <span className="floating-label">Feedback</span>
         </Form.Group>
      </Form.Row>
   );
};

export default ReviewInput;
