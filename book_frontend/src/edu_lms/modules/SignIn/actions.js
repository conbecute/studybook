import * as types from "../../constants/actionsType";

export const onDispatchDataInfo = (data) => {
  return {
    type: types.PA_DATA_INFO,
    data,
  };
};

export const onDispatchDataProfile = (data) => {
  return {
    type: types.PA_DATA_PROFILE,
    data,
  };
};

export const onDispatchListSchoolByProvince = (data) => {
  return {
    type: types.PA_DATA_SCHOOL_BY_PROVINCE,
    data,
  };
};
