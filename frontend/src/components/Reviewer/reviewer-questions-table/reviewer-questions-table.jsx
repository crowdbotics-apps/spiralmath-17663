import React, { useState } from "react";
import { Row, Col, Table, OverlayTrigger, Popover } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

//components
import { ReactComponent as UpArrowIcon } from "../../../assets/img/up-arrow-icon.svg";
//static
import { approvedStyle, approvedText } from "../../../helpers/utils";
import { ReactComponent as EditSvg } from "../../../assets/img/edit-svg.svg";

const ReviewerQuestionsTable = ({ questions, handleReviewForm }) => {
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
                              id="componentReviewerQuestionsTableId"
                           />
                        </th>
                        <th scope="col" className="border-0 font-style thead">
                           <FormattedMessage
                              defaultMessage="Question"
                              id="componentReviewerQuestionsTableQuestion"
                           />
                        </th>
                        <th scope="col" className="border-0 font-style thead">
                           <FormattedMessage
                              defaultMessage="Author"
                              id="componentReviewerQuestionsTableAuthor"
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
                              id="componentReviewerQuestionsTableStatus"
                           />
                        </th>
                        <th scope="col" className="border-0 font-style thead ">
                           <FormattedMessage
                              defaultMessage="Feedback"
                              id="componentReviewerQuestionsTableFeedback"
                           />
                        </th>

                        <th
                           scope="col"
                           className=" border-0 font-style create-user pointerType"
                        ></th>
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
                                    {question.author_name &&
                                       question.author_name}
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
                                 <td className={`border-left-0 border-right-0`}>
                                    {question.reviewer_feedback
                                       ? question.reviewer_feedback
                                       : "-/-"}
                                 </td>
                                 <td className="border-left-0">
                                    <div
                                       className="pointerType"
                                       onClick={() =>
                                          handleReviewForm(question)
                                       }
                                    >
                                       <EditSvg />
                                    </div>
                                 </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </Table>
            </div>
         </Col>
      </Row>
   );
};

export default ReviewerQuestionsTable;