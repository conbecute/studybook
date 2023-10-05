import * as TYPES from "../../constants/actionsType";

export const onDispatchListBookEducationTeacher = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_EDUCATION_TEACHER,
    data,
  };
};
export const onDispatchListSubjectEducationTeacher = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_SUBJECT_TEACHER,
    data,
  };
};
export const onDispatchUpdateParamterEducationTeacher = (data) => {
  return {
    type: TYPES.PA_UPDATE_DATA_PARAMTER_EDUCATION_TEACHER,
    data,
  };
};
