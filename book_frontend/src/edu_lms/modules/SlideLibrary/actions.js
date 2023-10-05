import * as TYPES from "../../constants/actionsType";

export const onDispatchListSlide = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_SLIDE,
    data,
  };
};

export const onDispatchListSubjectSlide = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_SUBJECT_SLIDE,
    data,
  };
};

export const onDispatchUpdateParamterSlide = (data) => {
  return {
    type: TYPES.PA_UPDATE_DATA_PARAMTER_SLIDE,
    data,
  };
};

export const onDispathSetInitialPage = (data) => {
  return {
    type: TYPES.SET_INITIAL_PAGE,
    data,
  };
};
