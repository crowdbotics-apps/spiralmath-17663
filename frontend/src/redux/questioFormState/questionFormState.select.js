import { createSelector } from "reselect";

const selectQuestionFormState = (state) => state;

export const selectFormState = createSelector(
   [selectQuestionFormState],
   (state) => state.questionFormStateReducer
);
