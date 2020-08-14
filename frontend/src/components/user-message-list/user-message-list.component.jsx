import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const userMessageList = [
  {
    id: 1,
    sendersName: "Raj Parmar",
    message: "Hello how are you is everything fine we are waiting for you.",
  },
  {
    id: 2,
    sendersName: "Raj Parmar",
    message: "Hello how are you is everything fine we are waiting for you.",
  },
  {
    id: 3,
    sendersName: "Raj Parmar",
    message: "Hello how are you is everything fine we are waiting for you.",
  },
  {
    id: 4,
    sendersName: "Raj Parmar",
    message:
      "Hello how are you is everything fine we are waiting for you.ow are you is everything fine we are waiting for you.",
  },
  {
    id: 5,
    sendersName: "Raj Parmarbchjbc",
    message: "Hello how are you i.",
  },
];

const UserMessageList = ({}) => {
  return (
    <div className="user-message-list">
      <ul>
        {userMessageList.map((message) => {
          return (
            <React.Fragment key={message.id}>
              <div className="message-item">
                <span className="user-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.6">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.75 13C7.75 12.31 8.31 11.75 9 11.75C9.69 11.75 10.25 12.31 10.25 13C10.25 13.69 9.69 14.25 9 14.25C8.31 14.25 7.75 13.69 7.75 13ZM13.75 13C13.75 12.31 14.31 11.75 15 11.75C15.69 11.75 16.25 12.31 16.25 13C16.25 13.69 15.69 14.25 15 14.25C14.31 14.25 13.75 13.69 13.75 13ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 11.21 19.88 10.45 19.67 9.74C18.95 9.91 18.2 10 17.42 10C14.05 10 11.07 8.33 9.26 5.77C8.28 8.16 6.41 10.09 4.05 11.14C4.02 11.42 4 11.71 4 12Z"
                        fill="black"
                      />
                    </g>
                  </svg>
                </span>
                <div className="user-details">
                  <span className="name">{message.sendersName}</span>
                  <p>{message.message}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </ul>
      <InputGroup className="mb-1">
        <FormControl
          placeholder="Write a message"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </div>
  );
};

export default UserMessageList;
