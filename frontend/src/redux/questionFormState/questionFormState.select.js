import { createSelector } from "reselect";

const selectState = (state) => state;

export const selectQuestionFormState = createSelector(
   [selectState],
   (state) => state.questionFormStateReducer
);

export const selectAnswerFormState = createSelector(
   [selectState],
   (state) => state.answer
);
