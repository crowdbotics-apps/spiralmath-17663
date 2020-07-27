import React from "react";
import { Row, Col } from "react-bootstrap";

import DashboardBox from "../dashboard-box/dashboardBox.component";

const AdminDashboard = () => {
  const questions = [
    { action: "Created", number: 1839 },
    { action: "Approved", number: 1755 },
    { action: "Pending", number: 125 },
    { action: "Rejected", number: 36 },
  ];

  const users = [
    { action: "Authors", number: 28 },
    { action: "Reviewers", number: 71 },
  ];

  return (
    <React.Fragment>
      <h3 className="mt-3 text-muted">Questions</h3>
      <Row className="mt-3">
        {questions.map((el) => (
          <Col key={el.action} md="3">
            <DashboardBox action={el.action} number={el.number} />
          </Col>
        ))}
      </Row>
      <h3 className="mt-3  text-muted">Users</h3>
      <Row className="mt-3">
        {users.map((el) => (
          <Col key={el.action} md="3">
            <DashboardBox action={el.action} number={el.number} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default AdminDashboard;
