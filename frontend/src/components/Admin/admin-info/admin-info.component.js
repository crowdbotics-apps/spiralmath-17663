import React from "react";
import { Row, Col } from "react-bootstrap";

import DashboardBox from "../../ui//dashboard-box/dashboardBox.component";

const AdminInfo = () => {
   const questions = [
      { action: "created", number: 1839 },
      { action: "approved", number: 1755 },
      { action: "pending", number: 125 },
      { action: "rejected", number: 36 },
   ];

   const users = [
      { action: "authors", number: 28 },
      { action: "reviewers", number: 71 },
   ];

   return (
      <React.Fragment>
         <h3 className="mt-5 text-muted dashboard-heading">Questions</h3>
         <div className="item-list-view">
            <Row className="mt-3">
               {questions.map((el) => (
                  <Col
                     key={el.action}
                     md="3"
                     className={`dashbaord-title ${el.action}`}
                  >
                     <DashboardBox
                        action={el.action}
                        number={el.number}
                        className={el.action}
                     />
                  </Col>
               ))}
            </Row>
         </div>

         <h3 className="mt-5  text-muted dashboard-heading">Users</h3>
         <div className="item-list-view">
            <Row className="mt-3">
               {users.map((el) => (
                  <Col
                     key={el.action}
                     md="3"
                     className={`dashbaord-title ${el.action}`}
                  >
                     <DashboardBox action={el.action} number={el.number} />
                  </Col>
               ))}
            </Row>
         </div>
      </React.Fragment>
   );
};

export default AdminInfo;
