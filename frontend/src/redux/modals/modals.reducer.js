import modalActionTypes from "./modal.types";

const INITIAL_STATE = {
  show: false,
};

const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case modalActionTypes.TOGGLE_CONTACT_MODAL:
      return {
        ...state,
        show: !state.show,
      };
    default:
      return state;
  }
};

export default modalReducer;
