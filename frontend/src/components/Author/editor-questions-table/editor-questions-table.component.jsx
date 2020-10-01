import React, { useState } from "react";
import { Row, Col, Table, OverlayTrigger, Popover } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

//components
import Pagination from "../../Common/pagination/pagination.component";
import QuestionsPopover from "../questions-popover/questions-popover.component";
//svgs
// import { ReactComponent as DeleteIcon } from "../../assets/img/delete-icon.svg";
// import { ReactComponent as EditIcon } from "../../assets/img/edit-icon.svg";
import { ReactComponent as CreateUserIcon } from "../../../assets/img/create-user-icon.svg";
import { ReactComponent as UpArrowIcon } from "../../../assets/img/up-arrow-icon.svg";
import "./editor-questions-table.styles.css";

const approvedStyle = (status) => {
   switch (status) {
      case 10:
         return "circle-approved";
      case 20:
         return "circle-pending";
      case 30:
         return "circle-rejected";
      default:
         return "circle-pending";
   }
};
const approvedText = (status) => {
   switch (status) {
      case 10:
         return "Approved";
      case 20:
         return "Pending";
      case 30:
         return "Rejected";
      default:
         return "Pending";
   }
};

const EditorQuestionsTable = ({ questions, renderDeleteEdit, all }) => {
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
                        {!all && (
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
                        )}
                     </tr>
                  </thead>
                  <tbody>
                     {questions &&
                        questions.map((question) => {
                           return (
                              <tr key={question.id}>
                                 <td className="border-right-0">
                                    {question.id && question.id}
                                 </td>
                                 <td className="border-right-0 border-left-0">
                                    {question.value && question.value}
                                 </td>
                                 <td className="border-right-0 border-left-0">
                                    {question.grade_level &&
                                       question.grade_level}
                                 </td>
                                 <td className="border-right-0 border-left-0">
                                    <div className="status-box">
                                       <div
                                          className={`circle ${approvedStyle(
                                             question.approved_status &&
                                                question.approved_status
                                          )}`}
                                       ></div>
                                       <div className="status-text">
                                          {approvedText(
                                             question.approved_status &&
                                                question.approved_status
                                          )}
                                       </div>
                                    </div>
                                 </td>
                                 <td
                                    className={`${
                                       !all && "border-right-0"
                                    } border-left-0`}
                                 >
                                    {question.reviewer_feedback &&
                                       question.reviewer_feedback}
                                 </td>
                                 {!all && (
                                    <td className="border-left-0">
                                       {renderDeleteEdit(question.id, question)}
                                    </td>
                                 )}
                              </tr>
                           );
                        })}
                  </tbody>
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
