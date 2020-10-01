import formStateTypes from "./questionFormState.type";

export const questionFormStateEdit = (data) => {
   return {
      type: formStateTypes.EDIT_QUESTION_TRUE,
      data,
   };
};
