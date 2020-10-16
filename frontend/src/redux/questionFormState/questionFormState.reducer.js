import formStateTypes from "./questionFormState.type";

const user = JSON.parse(localStorage.getItem("user"));
const author =
   user && user !== "undefined"
      ? user.userObj.first_name + " " + user.userObj.last_name
      : "";
const grade_level =
   localStorage.getItem("grade_level") &&
   localStorage.getItem("grade_level") !== "undefined"
      ? JSON.parse(localStorage.getItem("grade_level"))
      : "";
const standard_code =
   localStorage.getItem("standard_code") &&
   localStorage.getItem("standard_code") !== "undefined"
      ? JSON.parse(localStorage.getItem("standard_code"))
      : "";
const standard_set =
   localStorage.getItem("standard_set") &&
   localStorage.getItem("standard_set") !== "undefined"
      ? JSON.parse(localStorage.getItem("standard_set"))
      : "";

const initialStateQuestion = {
   value: "",
   author_name: author,
   question_type: "",
   grade_level: grade_level,
   content_source: "",
   image_source: "",
   alt_text: "",
   mills_difficulty_level: "",
   dok: "",
   copyright_status: "",
   summative_status: false,
   state_model: false,
   author_memo: "",
   creator: "",
   standard_code: standard_code,
   standard_set: { standard_set: standard_set },
   edit: false,
   id: "",
   approved_status: "",
   reviewer_feedback: "",
   question_style: "",
   reviewer_name: "",
};

const initialStateAnswer = {};

export const questionFormStateReducer = (
   state = initialStateQuestion,
   action
) => {
   switch (action.type) {
      case formStateTypes.EDIT_QUESTION_TRUE:
         return {
            ...initialStateQuestion,
            ...action.data,
            standard_set: {
               standard_set:
                  action.data.standard_set && action.data.standard_set,
            },
            edit: true,
         };
      case formStateTypes.EDIT_QUESTION_FALSE:
         return { ...initialStateQuestion, edit: false };
      default:
         return state;
   }
};

export const answerFormStateReducer = (state = initialStateAnswer, action) => {
   switch (action.type) {
      case formStateTypes.EDIT_ANSWER_TRUE:
         return { ...state,  ...action.data };
      case formStateTypes.RESET_ANSWER_STATE:
         return {...initialStateAnswer}
      default:
         return state;
   }
};
