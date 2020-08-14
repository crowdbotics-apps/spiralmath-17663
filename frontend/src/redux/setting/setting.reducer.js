import settingTypes from "./message.types";

const initialState = {
  uploadingFile: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case settingTypes.FILE_UPLOAD_REQUEST:
      return { ...state, uploadingFile: true };
    case settingTypes.FILE_UPLOAD_SUCCESS:
      return { ...state, uploadingFile: false };
    case settingTypes.FILE_UPLOAD_FAILURE:
      return { ...state, uploadingFile: false };
    default:
      return state;
  }
};
