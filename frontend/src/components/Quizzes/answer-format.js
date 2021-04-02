import parse from "html-react-parser";
import React from "react";
export const answerFormat = (question) => {
  if (
    // (question && question.question_type) === "sa" ||
    // (question && question.question_type) === "la"
    question &&
    typeof question.answers[0].content === "string"
  ) {
    return <p>{parse((question && question.answers[0].content) || "")}</p>;
  } else if (
    question &&
    typeof question.answers[0].content === "object" &&
    typeof question.answers[0].content.true === "boolean"
  ) {
    return (
      <>
        <p>1. {`${question.answers[0].content.true}`} </p>
        <p>2. {`${question.answers[0].content.false}`} </p>
      </>
    );
  } else {
    const options = question && Object.entries(question.answers[0].content);
    return (
      <>
        {options &&
          options.map((el) => {
            return <p>{`${parseInt(el[0]) + 1}. ${el[1].value}`} </p>;
          })}
      </>
    );
  }
};
