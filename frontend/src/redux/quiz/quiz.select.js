export const selectAllQuizzes = (state) => state.quiz.quizzes;
export const selectQuizCount = (state) => state.quiz.quizCount;
export const selectDeletingQuiz = (state) => state.quiz.deleteLoading;
export const selectCreatingQuiz = (state) => state.quiz.createLoading;
export const selectSingleQuiz = (state) =>
  state.singleQuiz && state.singleQuiz.data;
export const selectSingleQuizQuestions = (state) =>
  state.singleQuiz && state.singleQuiz.data && state.singleQuiz.data.questions;
