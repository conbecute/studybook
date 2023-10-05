import * as TYPES from "../../constants/actionsType";

export const onDispatchListQuestionSet = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_QUESTION_SET,
    data,
  };
};

export const onDispatchListSubjectQuestionSet = (data) => {
  return {
    type: TYPES.PA_DATA_LIST_SUBJECT_QUESTION_SET,
    data,
  };
};

export const onDispatchUpdateParamterQuestionSet = (data) => {
  return {
    type: TYPES.PA_UPDATE_DATA_PARAMTER_QUESTION_SET,
    data,
  };
};

export const onDispathSetInitialPageExercise = (data) => {
  return {
    type: TYPES.SET_INITIAL_PAGE_EXERCISE,
    data,
  };
};
