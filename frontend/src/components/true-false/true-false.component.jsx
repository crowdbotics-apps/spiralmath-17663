import React from "react";
import { Form, Col } from "react-bootstrap";
import { ReactComponent as A } from "../../assets/img/A.svg";
import { ReactComponent as B } from "../../assets/img/B.svg";
import { ReactComponent as Cross } from "../../assets/img/cross.svg";
import { ReactComponent as Tick } from "../../assets/img/tick.svg";

const TrueFalse = () => {
   return (
      <Form noValidate>
         <Form.Row>
            <Form.Group as={Col} md="8">
               <Form.Control
                  placeholder="Question:"
                  type="text"
                  className=" border-top-0 border-left-0 border-right-0 rounded-0"
               />
            </Form.Group>
         </Form.Row>
         <Form.Row className="d-flex">
            <Form.Group as={Col} md="0" className="align-self-center">
               <A />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mr-5">
               <Form.Control
                  type="text"
                  value="True"
                  className=" border-top-0 border-left-0 border-right-0 rounded-0"
               />
            </Form.Group>
            <Form.Group
               as={Col}
               md="1"
               className="d-flex justify-content-between align-items-center"
            >
               <span>
                  <Cross />
               </span>
               <span>
                  <Tick />
               </span>
            </Form.Group>
         </Form.Row>
         <Form.Row className="d-flex">
            <Form.Group as={Col} md="0" className="align-self-center">
               <B />
            </Form.Group>
            <Form.Group as={Col} md="8" className="mr-5">
               <Form.Control
                  type="text"
                  value="False"
                  className=" border-top-0 border-left-0 border-right-0 rounded-0"
               />
            </Form.Group>
            <Form.Group
               as={Col}
               md="1"
               className="d-flex justify-content-between align-items-center"
            >
               <span>
                  <Cross />
               </span>
               <span>
                  <Tick />
               </span>
            </Form.Group>
         </Form.Row>
      </Form>
   );
};

export default TrueFalse;
