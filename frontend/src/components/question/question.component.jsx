import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import { setQuestionType } from "../../redux/local/local.actions";
import QuestionMetaInfo from "../question-meta-info/question-meta-info.component";
import MultipleChoice from "../multiple-choice/multiple-choice.component";
import LongAnswer from "../long-answer/long-answer.component";
import ShortAnswer from "../short-answer/short-answer.component";
import TrueFalse from "../true-false/true-false.component";

const Question = ({ questionType }) => {
   const dispatch = useDispatch();

   const handleCancel = () => {
      dispatch(setQuestionType(false));
   };

   return (
      <React.Fragment>
         <div className="px-4 py-4 border form-border border-color ">
            <QuestionMetaInfo />
            {questionType === "MC" && <MultipleChoice />}
            {questionType === "LA" && <LongAnswer />}
            {questionType === "SA" && <ShortAnswer />}
            {questionType === "TF" && <TrueFalse />}
         </div>
         <div className="my-4 d-flex justify-content-end bottom-btn-grp">
            <Button className="mr-4 cancel-btn" onClick={handleCancel}>
               <FormattedMessage
                  defaultMessage="Cancel"
                  id="componentUsersTabCancelButton"
               />
            </Button>
            <Button className="save-btn">Save & Send</Button>
         </div>
      </React.Fragment>
   );
};

export default Question;
