import { createSelector } from "reselect";

const selectLocal = (state) => state.local;

export const selectQuestionType = createSelector(
   [selectLocal],
   (local) => local.questions
);
