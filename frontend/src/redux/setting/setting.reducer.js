import settingTypes from "./setting.types";

const initialState = {
  uploadingFile: false,
  uploadingEmails: false,
  uploadingTerms: false,
  gettingSettings: false,
  settings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case settingTypes.FILE_UPLOAD_REQUEST:
      return { ...state, uploadingFile: true };
    case settingTypes.FILE_UPLOAD_SUCCESS:
      return { ...state, uploadingFile: false };
    case settingTypes.FILE_UPLOAD_FAILURE:
      return { ...state, uploadingFile: false };
    case settingTypes.TERMS_UPLOAD_REQUEST:
      return { ...state, uploadingTerms: true };
    case settingTypes.TERMS_UPLOAD_SUCCESS:
      return { ...state, uploadingTerms: false };
    case settingTypes.TERMS_UPLOAD_FAILURE:
      return { ...state, uploadingTerms: false };
    case settingTypes.EMAIL_UPLOAD_REQUEST:
      return { ...state, uploadingEmails: true };
    case settingTypes.EMAIL_UPLOAD_SUCCESS:
      return { ...state, uploadingEmails: false };
    case settingTypes.EMAIL_UPLOAD_FAILURE:
      return { ...state, uploadingEmails: false };
    case settingTypes.GET_SETTINGS_REQUEST:
      return { ...state, gettingSettings: true, settings: [] };
    case settingTypes.GET_SETTINGS_FAILURE:
      return { ...state, gettingSettings: false };
    case settingTypes.GET_SETTINGS_SUCCESS:
      return { ...state, gettingSettings: false, settings: action.payload };
    default:
      return state;
  }
};
