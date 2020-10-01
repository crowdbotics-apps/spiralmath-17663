import React, { useState, useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import messageActions from "../../../redux/message/message.actions";
import MessageItem from "../../ui/message-item/message-item.component";
import { mapUserIdToMessageId } from "../../../helpers/utils";

const UserMessageList = ({ userId, messageId, setMessageIdProp }) => {
   const dispatch = useDispatch();
   const [message, setMessage] = useState("");
   let userMessageList = useSelector((state) => state.message.userMessageList);

   const sendingMessage = useSelector((state) => state.message.sendingMessage);
   const message_id_list = useSelector((state) => state.message.messagesIdList);
   if (!messageId) {
      userMessageList = [];
   }

   useEffect(() => {
      if (messageId && !sendingMessage) {
         dispatch(messageActions.get_single_user_messages(messageId));
      } else if (!messageId) {
         dispatch(messageActions.get_messages_id());
      }
   }, [sendingMessage, messageId]);

   useEffect(() => {
      setMessageIdProp(mapUserIdToMessageId(userId, message_id_list));
   }, [message_id_list]);

   const handleChange = (e) => {
      setMessage(e.target.value);
   };

   const handleKeyPressEnter = (e) => {
      if (e.keyCode === 13) {
         if (!message) {
            return;
         } else {
            console.log(e.keyCode);
            dispatch(
               messageActions.send_message({
                  userTo: userId,
                  newMessage: message,
               })
            );
            setMessage("");
         }
      }
   };

   return (
      <div className="user-message-list">
         <ul className="m-list">
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
