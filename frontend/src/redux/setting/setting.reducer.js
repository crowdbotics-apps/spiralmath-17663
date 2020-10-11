import settingTypes from "./setting.types";

const initialState = {
   uploadingFile: false,
   uploadingNon: false,
   uploadingR: false,
   uploadingTerms: false,
   gettingSettings: false,
   settings: [],
   creatingCreator: false,
};

export default (state = initialState, action) => {
   console.log(action);
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
      case settingTypes.NON_UPLOAD_REQUEST:
         return { ...state, uploadingNon: true };
      case settingTypes.NON_UPLOAD_SUCCESS:
         return { ...state, uploadingNon: false };
      case settingTypes.NON_UPLOAD_FAILURE:
         return { ...state, uploadingNon: false };
      case settingTypes.R_UPLOAD_REQUEST:
         return { ...state, uploadingR: true };
      case settingTypes.R_UPLOAD_SUCCESS:
         return { ...state, uploadingR: false };
      case settingTypes.R_UPLOAD_FAILURE:
         return { ...state, uploadingR: false };
      case settingTypes.GET_SETTINGS_REQUEST:
         return { ...state, gettingSettings: true, settings: [] };
      case settingTypes.GET_SETTINGS_FAILURE:
         return { ...state, gettingSettings: false };
      case settingTypes.GET_SETTINGS_SUCCESS:
         return { ...state, gettingSettings: false, settings: action.payload };
      case settingTypes.CREATE_CREATOR_REQUEST:
         return { ...state, creatingCreator: true };
      case settingTypes.CREATE_CREATOR_SUCCESS:
         return { ...state, creatingCreator: "success" };
      case settingTypes.CREATE_CREATOR_FAILURE:
         return { ...state, creatingCreator: "fail" };
      case settingTypes.SETTING_STATUS_CHANGER:
         return { ...state, creatingCreator: false };
      default:
         return state;
   }
};
