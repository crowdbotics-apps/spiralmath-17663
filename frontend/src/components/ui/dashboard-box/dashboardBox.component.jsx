import React from "react";

import { Card } from "react-bootstrap";

const DashboardBox = ({ action, number }) => {
  return (
    <Card border="primary" style={{ width: "15rem", height: "10rem" }}>
      <Card.Header>{action}</Card.Header>
      <Card.Body>
        <Card.Title>{number}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default DashboardBox;
