import modalActionTypes from "./modal.types";
import { alertActions } from "../user/user.actions";

export const toggleShow = () => {
  return (dispatch) => {
    dispatch(alertActions.clear());
    dispatch({
      type: modalActionTypes.TOGGLE_CONTACT_MODAL,
    });
  };
};
