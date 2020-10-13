import formStateTypes from "./questionFormState.type";

export const questionFormStateEdit = (data) => {
   return {
      type: formStateTypes.EDIT_QUESTION_TRUE,
      data,
   };
};
export const questionFormStateEditFalse = (data) => {
   return {
      type: formStateTypes.EDIT_QUESTION_FALSE,
   };
};
