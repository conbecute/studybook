import * as types from "../../constants/actionsType";

export const onDispatchListQuiz = (data) => {
  return {
    type: types.PA_DATA_LIST_QUIZ,
    data,
  };
};

export const onDispatchDataQuiz = (data) => {
  return {
    type: types.PA_DATA_DATA_QUIZ,
    data,
  };
};

export const onDispatchQuizDetail = (data) => {
  return {
    type: types.PA_DATA_DATA_QUIZ_DETAIL,
    data,
  };
};

export const onDispatchResultQuestion = (data) => {
  return {
    type: types.PA_DATA_DATA_RESULT_QUESTION,
    data,
  };
};
export const onDispatchResetQuestion = (data) => {
  return {
    type: types.PA_DATA_RESET_QUESTION,
    data,
  };
};
