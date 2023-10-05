import * as TYPES from "../../constants/actionsType";

export const onDispatchListQuestion = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_QUESTION_,
    data,
  };
};

export const onDispatchGradeName = (data) => {
  return {
    type: TYPES.PA_DATA_TITLE_GRADE_NAME,
    data,
  };
};
export const onDispatchSubjectName = (data) => {
  return {
    type: TYPES.PA_DATA_TITLE_SUBJECT_NAME,
    data,
  };
};
export const onDispatchTitleQuestionSet = (data) => {
  return {
    type: TYPES.PA_DATA_TITLE_QUESTION_SET,
    data,
  };
};
