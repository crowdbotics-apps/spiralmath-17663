import { createSelector } from "reselect";

const selectQuestion = (state) => state.question;

export const selectDeleteState = createSelector(
   [selectQuestion],
   (question) => question.deletingQuestion
);
