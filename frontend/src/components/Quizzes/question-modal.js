import React from "react";
import { Modal } from "react-bootstrap";
import parse from "html-react-parser";

const QuestionModal = ({ show, setShow, question }) => {

const answerFormat = () => {
      if((question && question.question_type) === "sa" || (question && question.question_type) === "la" ){
        return <p>{parse((question && question.answers[0].content) || "")}</p>
      }
      if((question && question.question_type) === 't/f'){
        return <>
        <p>1. {question.answers[0].content.true} </p>
        <p>2. {question.answers[0].content.false} </p>
        </>
      }
      if((question && question.question_type) === 'mc'){
        const options = Object.entries(question.answers[0].content)
        return <>{
            options.map(el => {
               return <p>{`${el[0]} ${el[1].value}`} </p>
        })
        }
       </>
      }
}


  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-50w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body>
      {parse((question && question.value) || "")}
      <br/>
      {answerFormat()}
      </Modal.Body>
      
    </Modal>
  );
};

export default QuestionModal;
