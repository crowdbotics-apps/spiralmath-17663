import settingService from "./setting.services";
import settingTypes from "./setting.types";
import { alertActions } from "../user/user.actions";

const upload_file = (data) => {
  return (dispatch) => {
    dispatch({ type: settingTypes.FILE_UPLOAD_REQUEST });
    settingService.upload_file(data).then(
      (data) => dispatch(alertActions.success("File Uploaded Successfully")),
      (error) => dispatch(alertActions.error(error.detail))
    );
  };
};

export default {
  upload_file,
};
