import settingService from "./setting.services";
import settingTypes from "./setting.types";
import { alertActions } from "../user/user.actions";

const upload_file = (data) => {
  return (dispatch) => {
    dispatch({ type: settingTypes.FILE_UPLOAD_REQUEST });
    settingService.upload_file(data).then(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  };
};

const upload_terms = (data) => {
  return (dispatch) => {
    dispatch({ type: settingTypes.TERMS_UPLOAD_REQUEST });
    settingService.upload_terms(data).then(
      (data) => dispatch({ type: settingTypes.TERMS_UPLOAD_SUCCESS }),
      (error) => dispatch({ type: settingTypes.TERMS_UPLOAD_FAILURE })
    );
  };
};

const upload_emails = (data) => {
  return (dispatch) => {
    dispatch({ type: settingTypes.EMAIL_UPLOAD_REQUEST });
    settingService.upload_email(data).then(
      (data) => dispatch({ type: settingTypes.EMAIL_UPLOAD_SUCCESS }),
      (error) => dispatch({ type: settingTypes.EMAIL_UPLOAD_FAILURE })
    );
  };
};

export default {
  upload_file,
  upload_terms,
  upload_emails,
};
