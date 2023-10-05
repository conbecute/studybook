import * as TYPES from "../../constants/actionsType";

export const onDispatchNumberIndex = (index) => {
  return {
    type: TYPES.PA_DATA_NUMBER_INDEX,
    index,
  };
};

export const onDispatchListAccountProvince = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_ACCOUNT_PROVINCE,
    data,
  };
};
export const onDispatchListAccountSchool = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_ACCOUNT_SCHOOL,
    data,
  };
};

export const onDispatchListAccountTeacher = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_ACCOUNT_TEACHER,
    data,
  };
};
export const onDispatchListResultQuiz = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_RESULT_QUIZ,
    data,
  };
};
