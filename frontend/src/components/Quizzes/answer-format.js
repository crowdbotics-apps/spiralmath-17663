import parse from "html-react-parser";
import React from "react";
export const answerFormat = (question) => {
  if (
    (question && question.question_type) === "sa" ||
    (question && question.question_type) === "la"
  ) {
    return <p>{parse((question && question.answers[0].content) || "")}</p>;
  }
  if ((question && question.question_type) === "t/f") {
    return (
      <>
        <p>1. {question.answers[0].content.true} </p>
        <p>2. {question.answers[0].content.false} </p>
      </>
    );
  }
  if ((question && question.question_type) === "mc") {
    const options = Object.entries(question.answers[0].content);
    return (
      <>
        {options.map((el) => {
          return <p>{`${el[0]} ${el[1].value}`} </p>;
        })}
      </>
    );
  }
};
