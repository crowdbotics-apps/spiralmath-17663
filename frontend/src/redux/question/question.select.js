import { createSelector } from "reselect";

const selectQuestion = (state) => state.question;

export const selectAnswerStatus = createSelector(
   [selectQuestion],
   (question) => question.creatingAnswer
);

export const selectStandardCode = createSelector(
   [selectQuestion],
   (question) => question.standardCode && question.standardCode
);

export const selectUserQuestions = createSelector(
   [selectQuestion],
   (question) =>
      question.userQuestions.questions && question.userQuestions.questions
);

export const selectUserQuestionsCount = createSelector(
   [selectQuestion],
   (question) => question.userQuestions && question.userQuestions.questionCount
);

export const selectAllQuestions = createSelector(
   [selectQuestion],
   (question) => question.allQuestions && question.allQuestions.questionCount
);

export const selectAllQuestionsCount = createSelector(
   [selectQuestion],
   (question) =>
      question.allQuestions.questions && question.allQuestions.questions
);

export const selectUpdatingQuestion = createSelector(
   [selectQuestion],
   (question) => question.updatingQuestion
);

export const selectDeletingQuestion = createSelector(
   [selectQuestion],
   (question) => question.deletingQuestion
);