import React, { useState, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import messageActions from "../../redux/message/message.actions";
import MessageItem from "../message-item/message-item.component";

const UserMessageList = ({ userId, messageId }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const userMessageList = useSelector((state) => state.message.userMessageList);
  const sendingMessage = useSelector((state) => state.message.sendingMessage);

  useEffect(() => {
    if (messageId && !sendingMessage) {
      dispatch(messageActions.get_single_user_messages(messageId));
    }
  }, [sendingMessage]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPressEnter = (e) => {
    if (e.keyCode == 13) {
      if (!message) {
        return;
      } else {
        console.log(e.keyCode);
        dispatch(
          messageActions.send_message({ userTo: userId, newMessage: message })
        );
        setMessage("");
      }
    }
  };

  return (
    <div className="user-message-list">
      <ul>
        {userMessageList.length === 0
          ? null
          : userMessageList.map((message) => {
              return <MessageItem key={message.date} message={message} />;
            })}
      </ul>
      <InputGroup className="mb-1">
        <FormControl
          placeholder="Write a message"
          aria-label="user message"
          aria-describedby="basic-addon1"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyPressEnter}
        />
      </InputGroup>
    </div>
  );
};

export default UserMessageList;
