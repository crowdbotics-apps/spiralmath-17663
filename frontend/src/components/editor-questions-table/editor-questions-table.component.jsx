import React, { useState } from "react";
import { Row, Col, Table, OverlayTrigger, Popover } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

//components
import Pagination from "../pagination/pagination.component";
import QuestionsPopover from "../questions-popover/questions-popover.component";
//svgs
// import { ReactComponent as DeleteIcon } from "../../assets/img/delete-icon.svg";
// import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";
import { ReactComponent as CreateUserIcon } from "../../assets/img/create-user-icon.svg";
import { ReactComponent as UpArrowIcon } from "../../assets/img/up-arrow-icon.svg";
import "./editor-question-table.styles.css";

const EditorQuestionsTable = () => {
   //popoverlogic
   const [showQuestionsPopover, setShowQuestionsPopover] = useState(false);
   //pagination logic
   const [currentPage, setCurrentPage] = useState(1);
   const [questionsPerPage] = useState(10);
   //    const currentQuestions = [];
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   return (
      <Row>
         <Col className="mt-3">
            <div>
               <Table
                  bordered
                  className="border-top-0 border-left-0 border-right-0"
               >
                  <thead>
                     <tr>
                        <th scope="col" className="border-0 font-style thead">
                           <FormattedMessage
                              defaultMessage="ID"
                              id="componentEditorQuestionsTableId"
                           />
                        </th>
                        <th scope="col" className="border-0 font-style thead">
                           <FormattedMessage
                              defaultMessage="Question"
                              id="componentEditorQuestionsTableQuestion"
                           />
                        </th>
                        <th scope="col" className="border-0 font-style thead">
                           <FormattedMessage
                              defaultMessage="Grade Level"
                              id="componentEditorQuestionsTableGradeLevel"
                           />
                        </th>
                        <th
                           scope="col"
                           className="border-0 font-style thead status-color"
                        >
                           <span>
                              <UpArrowIcon />
                           </span>
                           <FormattedMessage
                              defaultMessage="Status"
                              id="componentEditorQuestionsTableStatus"
                           />
                        </th>
                        <th scope="col" className="border-0 font-style thead ">
                           <FormattedMessage
                              defaultMessage="Feedback"
                              id="componentEditorQuestionsTableFeedback"
                           />
                        </th>

                        <th
                           scope="col"
                           className=" border-0 font-style create-user pointerType"
                        >
                           <OverlayTrigger
                              show={showQuestionsPopover}
                              placement="bottom"
                              overlay={() => <QuestionsPopover />}
                           >
                              <div
                                 className="d-flex align-items-center justify-content-end"
                                 onClick={() =>
                                    setShowQuestionsPopover(
                                       !showQuestionsPopover
                                    )
                                 }
                              >
                                 <span className="create-user-icon ipad-create-user-icon">
                                    <CreateUserIcon />
                                 </span>
                                 <b>
                                    <FormattedMessage
                                       defaultMessage="Create Question"
                                       id="componentEditorQuestionsTableCreateQuestion"
                                    />
                                 </b>
                              </div>
                           </OverlayTrigger>
                        </th>
                     </tr>
                  </thead>
                  <tbody></tbody>
               </Table>
               <Pagination
                  questionsPerPage={questionsPerPage}
                  totalQuestions={10}
                  paginate={paginate}
               />
            </div>
         </Col>
      </Row>
   );
};

export default EditorQuestionsTable;
