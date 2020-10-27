import React from "react";
import { Popover } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setQuestionType } from "../../../redux/local/local.actions";
import { ReactComponent as Mc } from "../../../assets/img/mc.svg";
import { ReactComponent as Sa } from "../../../assets/img/sa.svg";
import { ReactComponent as La } from "../../../assets/img/la.svg";
import { ReactComponent as Tf } from "../../../assets/img/tf.svg";
import "./question-popover.style.css";

const QuestionsPopover = () => {
   const dispatch = useDispatch();

   const handleClick = (questionType) => () => {
      dispatch(setQuestionType(questionType));
   };

   return (
      <Popover id="questions-popover">
         <Popover.Content>
            <Link
               to="/create-question"
               className="d-flex align-items-center question-popup-link"
            >
               <span>
                  <Mc />
               </span>
               <Popover.Title
                  className="pointerType"
                  onClick={handleClick("mc")}
               >
                  Multiple Choice
               </Popover.Title>
            </Link>
         </Popover.Content>
         <Popover.Content>
            <Link
               to="/create-question"
               className="d-flex align-items-center question-popup-link"
            >
               <span>
                  <Sa />
               </span>
               <Popover.Title
                  className="pointerType"
                  onClick={handleClick("sa")}
               >
                  Short Answer
               </Popover.Title>
            </Link>
         </Popover.Content>
         <Popover.Content>
            <Link
               to="/create-question"
               className="d-flex align-items-center question-popup-link"
            >
               <span>
                  <La />
               </span>
               <Popover.Title
                  className="pointerType"
                  onClick={handleClick("la")}
               >
                  Long Answer
               </Popover.Title>
            </Link>
         </Popover.Content>
         <Popover.Content>
            <Link
               to="/create-question"
               className="d-flex align-items-center question-popup-link"
            >
               <span>
                  <Tf />
               </span>
               <Popover.Title
                  className="last-popover pointerType"
                  onClick={handleClick("t/f")}
               >
                  True / False
               </Popover.Title>
            </Link>
         </Popover.Content>
      </Popover>
   );
};

export default QuestionsPopover;
