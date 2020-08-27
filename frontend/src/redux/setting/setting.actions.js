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

const upload_non_registered = (data) => {
  return (dispatch) => {
    dispatch({ type: settingTypes.NON_UPLOAD_REQUEST });
    settingService.upload_non_registered(data).then(
      (data) => dispatch({ type: settingTypes.NON_UPLOAD_SUCCESS }),
      (error) => dispatch({ type: settingTypes.NON_UPLOAD_FAILURE })
    );
  };
};

const upload_registered = (data) => {
  return (dispatch) => {
    dispatch({ type: settingTypes.R_UPLOAD_REQUEST });
    settingService.upload_registered(data).then(
      (data) => {
        dispatch({ type: settingTypes.R_UPLOAD_SUCCESS });
      },
      (error) => {
        dispatch({ type: settingTypes.R_UPLOAD_FAILURE });
      }
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
  upload_non_registered,
  upload_registered,
  get_settings,
};
