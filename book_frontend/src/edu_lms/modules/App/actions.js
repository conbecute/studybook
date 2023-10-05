import * as types from "../../constants/actionsType";

export const onDispatchShowLoading = (status) => {
  return {
    type: types.PA_SHOW_POPUP_LOADING,
    payload: { status },
  };
};

export const onDispatchIsBookEnglish = (data) => {
  return {
    type: types.PA_IS_BOOK_ENGLISH,
    payload: { data },
  };
};

export const onDispatchShowPopupActivateBook = (status) => {
  return {
    type: types.PA_SHOW_POPUP_ACTIVATE_BOOK,
    payload: { status },
  };
};

export const onDispatchTogglePopupSuccess = (dataSuccess) => {
  return {
    type: types.PA_SHOW_POPUP_SUCCESS,
    dataSuccess,
  };
};

export const onDispatchListBookType = (data) => {
  return {
    type: types.PA_LIST_BOOK_TYPE,
    data,
  };
};

export const onDispatchListGrade = (data) => {
  return {
    type: types.PA_LIST_GRADE,
    data,
  };
};

export const onDispatchListGradeAll = (data) => {
  return {
    type: types.PA_LIST_GRADE_ALL,
    data,
  };
};

export const onDispatchShowPopupPDF = (data) => {
  return {
    type: types.PA_DATA_SHOW_POPUP_PDF,
    data,
  };
};
export const onDispatchTypePopup = (typePopup) => {
  return {
    type: types.PA_DATA_TYPE_POPUP,
    typePopup,
  };
};
export const onDispatchStatusTour = (data) => {
  return {
    type: types.PA_DATA_REACT_TOUR,
    data,
  };
};
export const onDispatchCurrentStep = (data) => {
  return {
    type: types.PA_CURRENT_STEP,
    data,
  };
};

export const onDispatchSrcAudio = (data) => {
  return {
    type: types.PA_SET_SRC_AUDIO,
    data,
  };
};

export const onDispatchSetUserLocation = (data) => {
  return {
    type: types.PA_SET_USER_LOCATION,
    data,
  };
};

export const onDispatchUpdateTrainingConfig = (data) => {
  return {
    type: types.PA_UPDATE_TRAINING_CONFIG,
    data,
  };
};

export const onDispatchResetApp = () => {
  return {
    type: types.PA_RESET_APP,
  };
};
