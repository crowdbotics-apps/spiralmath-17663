import React from "react";

import { ReactComponent as UserIcon } from "../../assets/img/user-icon.svg";
import "./list-user.styles.css";

const ListUser = ({ user }) => {
  return (
    <div className="user-item pointerType">
      <span className="user-icon">
        <UserIcon />
      </span>
      <div className="user-details">
        <span className="name">{user.fullname}</span>
        <span className="msg-num">10</span>
      </div>
    </div>
  );
};

export default ListUser;
