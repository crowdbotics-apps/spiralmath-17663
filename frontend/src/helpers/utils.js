import Cookies from "js-cookie";
import { intl } from "./intl";

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

export const uploadHeader = () => {
  const csrftoken = Cookies.get("csrftoken");

  const userLang = navigator.language || navigator.userLanguage;

  if (csrftoken) {
    return {
      Accept: "application/json",
      "X-CSRFToken": csrftoken,
      "Accept-Language": userLang,
    };
  }
};

export const generateUserTypeDescription = (
  create_questions,
  review_questions
) => {
  if (create_questions && review_questions) {
    return intl.formatMessage({
      defaultMessage: "Can create and review questions",
      id: "componentUserTypesDescription1",
    });
  } else if (create_questions) {
    return intl.formatMessage({
      defaultMessage: "Can create questions",
      id: "componentUserTypesDescription2",
    });
  } else if (review_questions) {
    return intl.formatMessage({
      defaultMessage: "Can review questions",
      id: "componentUserTypesDescription3",
    });
  }
};

export const approvedStyle = (status) => {
  switch (status) {
    case 10:
      return "circle-pending";
    case 20:
      return "circle-approved";
    case 30:
      return "circle-rejected";
    default:
      return "circle-pending";
  }
};
export const approvedText = (status) => {
  switch (status) {
    case 10:
      return "Pending";
    case 20:
      return "Approved";
    case 30:
      return "Rejected";
    default:
      return "Pending";
  }
};

export const buildQueryStr = (obj) => {
  let str = "&";
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      str += `${key}=${value}&`;
    }
  }
  return str.slice(0, str.length - 1);
};
