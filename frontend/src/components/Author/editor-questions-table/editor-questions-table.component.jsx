import React, { useState } from "react";
import { Row, Col, Table, OverlayTrigger } from "react-bootstrap";
import parse from "html-react-parser";
import { FormattedMessage } from "react-intl";

//components
import QuestionsPopover from "../questions-popover/questions-popover.component";
//static
import { approvedText, approvedStyle } from "../../../helpers/utils";
import { ReactComponent as CreateUserIcon } from "../../../assets/img/create-user-icon.svg";
import { ReactComponent as UpArrowIcon } from "../../../assets/img/up-arrow-icon.svg";
import QuestionModal from "../../Common/question-modal";
import "./editor-questions-table.styles.css";

const EditorQuestionsTable = ({ questions, renderDeleteEdit, all }) => {
   //popoverlogic
   const [showQuestionsPopover, setShowQuestionsPopover] = useState(false);
   const [showQuestionModal, setShowQuestionModal] = useState(false);
   const [currentQuestion, setCurrentQuestion] = useState(null);
 
   const handleQuestionModal = (question) => () => {
     setCurrentQuestion(question);
     setShowQuestionModal(true);
   };

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
                                <td
                        className="border-right-0 cursor-pointer "
                        onClick={handleQuestionModal(question)}
                      >
                        <span className="link">
                          {question.id && question.id}
                        </span>
                      </td>
                                 <td className="border-right-0 border-left-0">
                                    {question.value && parse(question.value)}
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
                                    className={`${"border-right-0"} border-left-0`}
                                 >
                                    {question.reviewer_feedback
                                       ? question.reviewer_feedback
                                       : "-/-"}
                                 </td>

                                 <td className="border-left-0">
                                    {renderDeleteEdit(question.id, question)}
                                 </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </Table>
            </div>
         </Col>
         <QuestionModal
        show={showQuestionModal}
        setShow={setShowQuestionModal}
        question={currentQuestion}
        isReview={true}
      />
      </Row>
   );
};

export default EditorQuestionsTable;
