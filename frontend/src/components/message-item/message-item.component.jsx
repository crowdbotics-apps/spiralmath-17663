import React from "react";

import { ReactComponent as UserIcon } from "../../assets/img/user-icon.svg";

const MessageItem = ({ message }) => {
  const userName = Object.keys(message.text)[0];
  return (
    <div className="message-item">
      <span className="user-icon">
        <UserIcon />
      </span>
      <div className="user-details">
        <span className="name">{userName}</span>
        <p>{message.text[userName]}</p>
      </div>
    </div>
  );
};

export default MessageItem;
