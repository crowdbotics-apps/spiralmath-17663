import React from "react";
import Select from "react-select";
import { useIntl } from "react-intl";
import { Row, Col, Table, Form, Button, Modal } from "react-bootstrap";

const gradeLevel = ["PK", "K", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const millsDiffLevel = [1, 2, 3, 4, 5];
const DOK = [1, 2, 3, 4];

const QuestionMetaInfo = () => {
   const intl = useIntl();
   return (
      <Form noValidate>
         <Form.Row>
            <Form.Group as={Col} md="2">
               <Form.Control
                  as="select"
                  className="small-text border-top-0 border-left-0 border-right-0 rounded-0"
               >
                  {gradeLevel.map((grade) => (
                     <option key={grade} value={grade}>
                        Grade Level:{grade}
                     </option>
                  ))}
               </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="3">
               <Form.Control
                  as="select"
                  className="small-text border-top-0 border-left-0 border-right-0 rounded-0 "
               >
                  {millsDiffLevel.map((level) => (
                     <option key={level} value={level}>
                        Mills Difficulty Level:{level}
                     </option>
                  ))}
               </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="1">
               <Form.Control
                  as="select"
                  className="small-text border-top-0 border-left-0 border-right-0 rounded-0"
               >
                  <option>DOK</option>
                  {DOK.map((level) => (
                     <option key={level} value={level}>
                        {level}
                     </option>
                  ))}
               </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="2">
               <Form.Control
                  as="select"
                  className="small-text border-top-0 border-left-0 border-right-0 rounded-0"
               >
                  <option>Question Style</option>
               </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md="2" className="mt-2 ">
               <Form.Check type="switch" id="ss" label="Summative Status" />
            </Form.Group>
            <Form.Group as={Col} md="2" className="mt-2 ">
               <Form.Check type="switch" id="sm" label="State Model" />
            </Form.Group>
         </Form.Row>
         <Form.Row>
            <Form.Group as={Col} md="3">
               <Form.Control
                  as="select"
                  className="floating-type border-top-0 border-left-0 border-right-0 rounded-0"
               >
                  <option>Standard Code</option>
               </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4">
               <Form.Control
                  type="text"
                  className=" border-top-0 border-left-0 border-right-0 rounded-0"
               />
               <span className="floating-label">Copyright Status</span>
            </Form.Group>
            <Form.Group as={Col} md="4">
               <Form.Control
                  type="text"
                  className=" border-top-0 border-left-0 border-right-0 rounded-0"
               />
               <span className="floating-label">Content Source</span>
            </Form.Group>
         </Form.Row>
         <Form.Row>
            <Form.Group as={Col} md="7">
               <Form.Control
                  type="text"
                  className=" border-top-0 border-left-0 border-right-0 rounded-0"
               />
               <span className="floating-label">Memo</span>
            </Form.Group>
            <Form.Group as={Col} md="3" className="alignment ml-2">
               <Button variant="outline-primary" className="upload-excel">
                  Add Image
               </Button>
            </Form.Group>
         </Form.Row>
      </Form>
   );
};

export default QuestionMetaInfo;
