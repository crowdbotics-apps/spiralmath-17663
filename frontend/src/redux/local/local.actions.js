import localTypes from "./local.types";

export const setQuestionType = (questionType) => {
   return {
      type: localTypes.SET_QUESTION_TYPE,
      payload: questionType,
   };
};
