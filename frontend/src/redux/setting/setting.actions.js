import settingService from "./setting.services";
import settingTypes from "./setting.types";

const upload_file = (data) => {
  return (dispatch) => {
    dispatch({ type: settingTypes.FILE_UPLOAD_REQUEST });
    settingService.upload_file(data).then(
      (data) => dispatch({ type: settingTypes.FILE_UPLOAD_SUCCESS }),
      (error) => dispatch({ type: settingTypes.FILE_UPLOAD_FAILURE })
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
    settingService.upload_emails(data).then(
      (data) => dispatch({ type: settingTypes.EMAIL_UPLOAD_SUCCESS }),
      (error) => dispatch({ type: settingTypes.EMAIL_UPLOAD_FAILURE })
    );
  };
};

const get_settings = () => {
  return (dispatch) => {
    dispatch({ type: settingTypes.GET_SETTINGS_REQUEST });
    settingService.get_settings().then(
      (data) =>
        dispatch({
          type: settingTypes.GET_SETTINGS_SUCCESS,
          payload: data.results,
        }),
      (error) =>
        dispatch({ type: settingTypes.GET_SETTINGS_FAILURE, payload: error })
    );
  };
};

export default {
  upload_file,
  upload_terms,
  upload_emails,
  get_settings,
};
