import { createSelector } from "reselect";

const selectQuestion = (state) => state.question;

export const selectAnswerStatus = createSelector(
  [selectQuestion],
  (question) => question.creatingAnswer
);
export const selectCreatingQuestion = createSelector(
  [selectQuestion],
  (question) => question.creatingQuestion
);

export const selectStandardCode = createSelector(
  [selectQuestion],
  (question) =>
    question.standardCode &&
    question.standardCode["Standard Set"].filter(function (item, pos) {
      return question.standardCode["Standard Set"].indexOf(item) == pos;
    })
);

export const selectReviewers = createSelector(
  [selectQuestion],
  (question) => question.reviewers && question.reviewers
);

export const selectCreators = createSelector(
  [selectQuestion],
  (question) => question.creators && question.creators
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
  (question) => question.allQuestions && question.allQuestions.questions
);

export const selectAllQuestionsCount = createSelector(
  [selectQuestion],
  (question) =>
    question.allQuestions.questions && question.allQuestions.questionCount
);

export const selectUpdatingQuestion = createSelector(
  [selectQuestion],
  (question) => question.updatingQuestion
);

export const selectDeletingQuestion = createSelector(
  [selectQuestion],
  (question) => question.deletingQuestion
);
