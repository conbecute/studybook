import * as types from "../../constants/actionsType";

export const onDispatchListProvince = (data) => {
  return {
    type: types.PA_DATA_PROVINCE,
    data,
  };
};

export const onDispatchListDistrict = (data) => {
  return {
    type: types.PA_DATA_PISTRICT,
    data,
  };
};
export const onDispatchListWard = (data) => {
  return {
    type: types.PA_DATA_WARD,
    data,
  };
};

export const onDispatchListSchool = (data) => {
  return {
    type: types.PA_DATA_SCHOOL,
    data,
  };
};

export const onDispatchActiveSliderUpdateInfo = (value) => {
  return {
    type: types.PA_DATA_ACTIVE_SLIDER_UPDATE_INFO,
    value,
  };
};

export const onDispatchListTeachingInformation = (data) => {
  return {
    type: types.PA_DATA_ACTIVE_TEACHING_INFORMATION,
    data,
  };
};

export const onDispatchListSubjectAll = (data) => {
  return {
    type: types.PA_DATA_ACTIVE_LIST_SUBJECT_ALL,
    data,
  };
};
