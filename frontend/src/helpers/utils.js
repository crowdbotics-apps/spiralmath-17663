export const mapUserIdToMessageId = (id, list) => {
   for (let i = 0; i < list.length; i++) {
      if (list[i].users[0] === id || list[i].users[1] === id) {
         return list[i].id;
      }
   }
   return false;
};

export const addUnreadCount = (userList, messageList) => {
   let unreadCount = 0;
   for (let i = 0; i < userList.length; i++) {
      for (let j = 0; j < messageList.length; j++) {
         userList[i].unreadCount = 0;
      }
   }
   for (let i = 0; i < userList.length; i++) {
      for (let j = 0; j < messageList.length; j++) {
         if (messageList[j].users[0] === userList[i].id) {
            userList[i].unreadCount = messageList[j].unread_counter;
            unreadCount += messageList[j].unread_counter;
         }
      }
   }
   return unreadCount;
};
