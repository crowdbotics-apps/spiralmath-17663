import React, { useState } from "react";
import { Row, Col, Table, OverlayTrigger, Popover } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

//components
import Pagination from "../../Common/pagination/pagination.component";
import { ReactComponent as UpArrowIcon } from "../../../assets/img/up-arrow-icon.svg";

const ReviewerQuestionsTable = ({ reviews, renderEdit }) => {
   //pagination logic
   const [currentPage, setCurrentPage] = useState(1);
   const [reviewsPerPage] = useState(10);
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
                  <tbody></tbody>
               </Table>
               <Pagination
                  reviewsPerPage={reviewsPerPage}
                  totalReviews={10}
                  paginate={paginate}
               />
            </div>
         </Col>
      </Row>
   );
};

export default ReviewerQuestionsTable;
