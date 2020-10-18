import React from "react";
import { Row, Col } from "react-bootstrap";

const MessageBar = ({ messageType, message, handleClearMessage }) => {
   return (
      <Row>
         <Col className="mt-3 mb-3">
            <p
               className={
                  messageType === "SUCCESS" ? " text-success" : " text-danger"
               }
               onMouseEnter={handleClearMessage}
            >
               {message}
            </p>
         </Col>
      </Row>
   );
};

export default MessageBar;
