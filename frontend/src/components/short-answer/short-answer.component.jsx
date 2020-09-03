import React from "react";
import { Form, Col } from "react-bootstrap";

const ShortAnswer = () => {
   return (
      <Form noValidate>
         <Form.Row>
            <Form.Group as={Col} md="8">
               <Form.Control
                  type="text"
                  placeholder="Question:"
                  className=" border-top-0 border-left-0 border-right-0 rounded-0"
               />
            </Form.Group>
         </Form.Row>
      </Form>
   );
};

export default ShortAnswer;
